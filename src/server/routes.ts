"use server";

import { getUnixTime } from "date-fns";
import { and, eq, or } from "drizzle-orm";
import { alias } from "drizzle-orm/sqlite-core";
import { revalidatePath } from "next/cache";
import { db } from "~/db";
import {
	aircraft_table,
	airport_table,
	flight_table,
	route_table,
} from "~/db/tables";
import { ServerResponse } from "~/lib/handlers/response-handler";
import type { RouteCreateData } from "~/validators/routes";

export async function getRoutes(_airlineId: string) {
	try {
		const departure_airport_table = alias(airport_table, "departure_airport");
		const arrival_airport_table = alias(airport_table, "arrival_airport");

		const routes = await db
			.select({
				id: route_table.id,
				departureCity: departure_airport_table.city,
				departureCountry: departure_airport_table.country,
				departureAirport: departure_airport_table.name,
				arrivalCity: arrival_airport_table.city,
				arrivalCountry: arrival_airport_table.country,
				arrivalAirport: departure_airport_table.name,
				durationMinutes: route_table.durationMinutes,
			})
			.from(route_table)
			.innerJoin(
				departure_airport_table,
				eq(departure_airport_table.id, route_table.departureAirportId),
			)
			.innerJoin(
				arrival_airport_table,
				eq(arrival_airport_table.id, route_table.arrivalAirportId),
			);

		return ServerResponse.success(
			{
				routes,
			},
			{
				message: "Routes retrieved successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				routes: [],
			},
			{
				message: "An error occurred while retrieving routes.",
			},
		);
	}
}

export async function createRoute(data: RouteCreateData) {
	try {
		const routes = await db.insert(route_table).values(data).returning();

		return ServerResponse.created(
			{
				route: routes[0],
			},
			{
				message: "Route created successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				route: null,
			},
			{
				message: "An error occurred while creating route.",
			},
		);
	} finally {
		revalidatePath("/overview");
		revalidatePath("/flights");
		revalidatePath("/bookings");
		revalidatePath("/management");
		revalidatePath("/records");
	}
}

export async function updateRoute(id: string, data: RouteCreateData) {
	try {
		const routes = await db
			.update(route_table)
			.set({ ...data, updatedAt: getUnixTime(new Date()) })
			.where(eq(route_table.id, id))
			.returning();

		return ServerResponse.success(
			{
				route: routes[0],
			},
			{
				message: "Route updated successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				route: null,
			},
			{
				message: "An error occurred while updating route.",
			},
		);
	} finally {
		revalidatePath("/overview");
		revalidatePath("/flights");
		revalidatePath("/bookings");
		revalidatePath("/management");
		revalidatePath("/records");
	}
}

export async function deleteRoute(id: string) {
	try {
		await db.delete(route_table).where(eq(route_table.id, id));

		const flights = await db
			.update(flight_table)
			.set({ status: "cancelled", updatedAt: getUnixTime(new Date()) })
			.where(
				and(eq(flight_table.routeId, id), eq(flight_table.status, "scheduled")),
			)
			.returning();

		await db
			.update(aircraft_table)
			.set({ status: "avaiable" })
			.where(
				and(
					eq(aircraft_table.id, flights[0].aircraftId),
					eq(aircraft_table.status, "booked"),
				),
			);

		return ServerResponse.success(
			{
				route: null,
			},
			{
				message: "Route deleted successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				route: null,
			},
			{
				message: "An error occurred while deleting route.",
			},
		);
	} finally {
		revalidatePath("/overview");
		revalidatePath("/flights");
		revalidatePath("/bookings");
		revalidatePath("/management");
		revalidatePath("/records");
	}
}
