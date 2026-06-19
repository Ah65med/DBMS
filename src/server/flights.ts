"use server";

import { fromUnixTime, getUnixTime } from "date-fns";
import { and, eq } from "drizzle-orm";
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
import { AircraftStatus } from "~/validators/aircrafts";
import {
	type FlightCreateData,
	FlightStatus,
	type FlightUpdateData,
} from "~/validators/flights";

export async function getFlights(airlineId: string) {
	try {
		const departure_airport_table = alias(airport_table, "departure_airport");
		const arrival_airport_table = alias(airport_table, "arrival_airport");

		const flights = await db
			.select({
				id: flight_table.id,
				aircraftMake: aircraft_table.make,
				aircraftModel: aircraft_table.model,
				routeId: route_table.id,
				departureTime: flight_table.departure,
				arrivalTime: flight_table.arrival,
				status: flight_table.status,
				price: flight_table.price,
				departureCity: departure_airport_table.city,
				departureCountry: departure_airport_table.country,
				departureAirport: departure_airport_table.name,
				arrivalCity: arrival_airport_table.city,
				arrivalCountry: arrival_airport_table.country,
				arrivalAirport: arrival_airport_table.name,
				capacity: aircraft_table.capacity,
				passengerCount: flight_table.passengerCount,
			})
			.from(flight_table)
			.innerJoin(aircraft_table, eq(aircraft_table.id, flight_table.aircraftId))
			.innerJoin(route_table, eq(route_table.id, flight_table.routeId))
			.innerJoin(
				departure_airport_table,
				eq(departure_airport_table.id, route_table.departureAirportId),
			)
			.innerJoin(
				arrival_airport_table,
				eq(arrival_airport_table.id, route_table.arrivalAirportId),
			)
			.where(eq(flight_table.airlineId, airlineId));

		return ServerResponse.success(
			{
				flights: flights.map((flight) => ({
					...flight,
					status: flight.status as FlightStatus,
					departureTime: fromUnixTime(flight.departureTime),
					arrivalTime: fromUnixTime(flight.arrivalTime),
				})),
			},
			{
				message: "Flights retrieved successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				flights: [],
			},
			{
				message: "An error occurred while retrieving flights.",
			},
		);
	}
}

export async function getFlightById(id: string) {
	try {
		const departure_airport_table = alias(airport_table, "departure_airport");
		const arrival_airport_table = alias(airport_table, "arrival_airport");

		const flights = await db
			.select({
				id: flight_table.id,
				aircraftMake: aircraft_table.make,
				aircraftModel: aircraft_table.model,
				routeId: route_table.id,
				departureTime: flight_table.departure,
				arrivalTime: flight_table.arrival,
				status: flight_table.status,
				price: flight_table.price,
				departureCity: departure_airport_table.city,
				departureCountry: departure_airport_table.country,
				departureAirport: departure_airport_table.name,
				arrivalCity: arrival_airport_table.city,
				arrivalCountry: arrival_airport_table.country,
				arrivalAirport: arrival_airport_table.name,
				capacity: aircraft_table.capacity,
				passengerCount: flight_table.passengerCount,
			})
			.from(flight_table)
			.innerJoin(aircraft_table, eq(aircraft_table.id, flight_table.aircraftId))
			.innerJoin(route_table, eq(route_table.id, flight_table.routeId))
			.innerJoin(
				departure_airport_table,
				eq(departure_airport_table.id, route_table.departureAirportId),
			)
			.innerJoin(
				arrival_airport_table,
				eq(arrival_airport_table.id, route_table.arrivalAirportId),
			)
			.where(eq(flight_table.id, id));

		return ServerResponse.success(
			{
				flight: flights[0],
			},
			{
				message: "Flight retrieved successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				flight: null,
			},
			{
				message: "An error occurred while retrieving flight.",
			},
		);
	}
}

export async function getAvailableFlightsOfAirline(airlineId: string) {
	try {
		const departure_airport_table = alias(airport_table, "departure_airport");
		const arrival_airport_table = alias(airport_table, "arrival_airport");

		const flights = await db
			.select({
				id: flight_table.id,
				aircraftMake: aircraft_table.make,
				aircraftModel: aircraft_table.model,
				routeId: route_table.id,
				departureTime: flight_table.departure,
				arrivalTime: flight_table.arrival,
				status: flight_table.status,
				price: flight_table.price,
				departureCity: departure_airport_table.city,
				departureCountry: departure_airport_table.country,
				departureAirport: departure_airport_table.name,
				arrivalCity: arrival_airport_table.city,
				arrivalCountry: arrival_airport_table.country,
				arrivalAirport: arrival_airport_table.name,
				capacity: aircraft_table.capacity,
				passengerCount: flight_table.passengerCount,
			})
			.from(flight_table)
			.innerJoin(aircraft_table, eq(aircraft_table.id, flight_table.aircraftId))
			.innerJoin(route_table, eq(route_table.id, flight_table.routeId))
			.innerJoin(
				departure_airport_table,
				eq(departure_airport_table.id, route_table.departureAirportId),
			)
			.innerJoin(
				arrival_airport_table,
				eq(arrival_airport_table.id, route_table.arrivalAirportId),
			)
			.where(
				and(
					eq(flight_table.airlineId, airlineId),
					eq(flight_table.status, FlightStatus.Scheduled),
				),
			);

		return ServerResponse.success(
			{
				flights: flights.map((flight) => ({
					...flight,
					status: flight.status as FlightStatus,
					departureTime: fromUnixTime(flight.departureTime),
					arrivalTime: fromUnixTime(flight.arrivalTime),
				})),
			},
			{
				message: "Flights retrieved successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				flights: [],
			},
			{
				message: "An error occurred while retrieving flights.",
			},
		);
	}
}

export async function createFlight(data: FlightCreateData) {
	try {
		const flights = await db
			.insert(flight_table)
			.values({
				airlineId: data.airlineId,
				routeId: data.routeId,
				aircraftId: data.aircraftId,
				departure: getUnixTime(data.departure),
				arrival: getUnixTime(data.arrival),
				price: data.price,
			})
			.returning();

		await db
			.update(aircraft_table)
			.set({
				status: "booked",
			})
			.where(eq(aircraft_table.id, data.aircraftId));

		return ServerResponse.created(
			{
				flight: flights[0],
			},
			{
				message: "Flight created successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				flight: null,
			},
			{
				message: "An error occurred while creating flight.",
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

export async function updateFlight(id: string, data: FlightUpdateData) {
	try {
		const flights = await db
			.update(flight_table)
			.set({
				...data,
				departure: data.departure && getUnixTime(data.departure),
				arrival: data.arrival && getUnixTime(data.arrival),
			})
			.where(eq(flight_table.id, id))
			.returning();

		if (
			data.status === FlightStatus.Cancelled ||
			data.status === FlightStatus.Comepleted
		) {
			await db
				.update(aircraft_table)
				.set({
					status: AircraftStatus.Parked,
				})
				.where(eq(aircraft_table.id, flights[0].aircraftId));
		}

		return ServerResponse.success(
			{
				flight: flights[0],
			},
			{
				message: "Flight updated successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				flight: null,
			},
			{
				message: "An error occurred while updating flight.",
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

export async function deleteFlight(id: string) {
	try {
		await db.delete(flight_table).where(eq(flight_table.id, id));

		await db
			.update(aircraft_table)
			.set({
				status: "available",
			})
			.where(eq(aircraft_table.id, id));

		return ServerResponse.success(
			{
				flight: null,
			},
			{
				message: "Flight deleted successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				flight: null,
			},
			{
				message: "An error occurred while deleting flight.",
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
