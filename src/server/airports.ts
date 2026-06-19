"use server";

import { getUnixTime } from "date-fns";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "~/db";
import { airports_to_airlines_table } from "~/db/joins";
import { airport_table } from "~/db/tables";
import { ServerResponse } from "~/lib/handlers/response-handler";
import type { AirportCreateData, AirportReadData } from "~/validators/airports";

export async function getAirports(_airlineId: string) {
	try {
		const airports = await db
			.select({
				id: airport_table.id,
				name: airport_table.name,
				country: airport_table.country,
				city: airport_table.city,
			})
			.from(airport_table);

		return ServerResponse.success<{ airports: AirportReadData[] }>(
			{
				airports,
			},
			{
				message: "Airports retrieved successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error<{ airports: AirportReadData[] }>(
			{
				airports: [],
			},
			{
				message: "An error occurred while retrieving airports.",
			},
		);
	}
}

export async function getAirportById(_airlineId: string, id: string) {
	try {
		const airports = await db
			.select({
				id: airport_table.id,
				name: airport_table.name,
				country: airport_table.country,
				city: airport_table.city,
			})
			.from(airport_table)
			.where(eq(airport_table.id, id));

		return ServerResponse.success(
			{
				airport: airports[0],
			},
			{
				message: "Airport retrieved successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				airport: null,
			},
			{
				message: "An error occurred while retrieving airport.",
			},
		);
	}
}

export async function createAirport(data: AirportCreateData) {
	try {
		const airports = await db.insert(airport_table).values(data).returning();

		if (!airports[0]) {
			throw new Error();
		}

		await db.insert(airports_to_airlines_table).values({
			airport_id: airports[0].id,
			airline_id: data.airlineId,
		});

		return ServerResponse.created(
			{
				airport: airports[0],
			},
			{
				message: "Airport created successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				airport: null,
			},
			{
				message: "An error occurred while creating airport.",
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

export async function updateAirport(id: string, data: AirportCreateData) {
	try {
		const airports = await db
			.update(airport_table)
			.set({ ...data, updatedAt: getUnixTime(new Date()) })
			.where(eq(airport_table.id, id))
			.returning();

		return ServerResponse.success(
			{
				airport: airports[0],
			},
			{
				message: "Airport updated successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				airport: null,
			},
			{
				message: "An error occurred while updating airport.",
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

export async function deleteAirport(id: string) {
	try {
		await db.delete(airport_table).where(eq(airport_table.id, id));

		return ServerResponse.success(
			{
				airport: null,
			},
			{
				message: "Airport deleted successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				airport: null,
			},
			{
				message: "An error occurred while deleting airport.",
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
