"use server";

import { fromUnixTime, getUnixTime } from "date-fns";
import { and, desc, eq } from "drizzle-orm";
import { alias } from "drizzle-orm/sqlite-core";
import { revalidatePath } from "next/cache";
import { db } from "~/db";
import {
	aircraft_table,
	airline_table,
	airport_table,
	flight_table,
	passenger_table,
	route_table,
	ticket_table,
} from "~/db/tables";
import { ServerResponse } from "~/lib/handlers/response-handler";
import { FlightStatus } from "~/validators/flights";
import type { TicketCreateData, TicketUpdateData } from "~/validators/tickets";
import { getFlightById, updateFlight } from "./flights";

export async function getTickets(airlineId: string) {
	try {
		const departure_airport_table = alias(airport_table, "departure_airport");
		const arrival_airport_table = alias(airport_table, "arrival_airport");

		const tickets = await db
			.select({
				id: ticket_table.id,
				flightId: ticket_table.flightId,
				passengerName: passenger_table.name,
				passengerPhone: passenger_table.phone,
				airlineName: airline_table.name,
				aircraftMake: aircraft_table.make,
				aircraftModel: aircraft_table.model,
				departureAirport: departure_airport_table.name,
				departureCity: departure_airport_table.city,
				departureCountry: departure_airport_table.country,
				departureTime: flight_table.departure,
				arrivalTime: flight_table.arrival,
				arrivalAirport: arrival_airport_table.name,
				arrivalCity: arrival_airport_table.city,
				arrivalCountry: arrival_airport_table.country,
				price: flight_table.price,
			})
			.from(ticket_table)
			.innerJoin(
				passenger_table,
				eq(passenger_table.id, ticket_table.passengerId),
			)
			.innerJoin(flight_table, eq(flight_table.id, ticket_table.flightId))
			.innerJoin(route_table, eq(route_table.id, flight_table.routeId))
			.innerJoin(aircraft_table, eq(aircraft_table.id, flight_table.aircraftId))
			.innerJoin(
				departure_airport_table,
				eq(departure_airport_table.id, route_table.departureAirportId),
			)
			.innerJoin(
				arrival_airport_table,
				eq(arrival_airport_table.id, route_table.arrivalAirportId),
			)
			.innerJoin(airline_table, eq(airline_table.id, flight_table.airlineId))
			.where(eq(flight_table.airlineId, airlineId))
			.orderBy(desc(ticket_table.updatedAt));

		return ServerResponse.success(
			{
				tickets: tickets.map((ticket) => ({
					...ticket,
					departureTime: fromUnixTime(ticket.departureTime),
					arrivalTime: fromUnixTime(ticket.arrivalTime),
				})),
			},
			{
				message: "Tickets retrieved successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				tickets: [],
			},
			{
				message: "An error occurred while retrieving tickets.",
			},
		);
	}
}

export async function getTicketById(id: string) {
	try {
		const departure_airport_table = alias(airport_table, "departure_airport");
		const arrival_airport_table = alias(airport_table, "arrival_airport");

		const tickets = await db
			.select({
				id: ticket_table.id,
				flightId: ticket_table.flightId,
				passengerName: passenger_table.name,
				passengerPhone: passenger_table.phone,
				airlineName: airline_table.name,
				aircraftMake: aircraft_table.make,
				aircraftModel: aircraft_table.model,
				departureAirport: departure_airport_table.name,
				departureCity: departure_airport_table.city,
				departureCountry: departure_airport_table.country,
				departureTime: flight_table.departure,
				arrivalTime: flight_table.arrival,
				arrivalAirport: arrival_airport_table.name,
				arrivalCity: arrival_airport_table.city,
				arrivalCountry: arrival_airport_table.country,
				price: flight_table.price,
			})
			.from(ticket_table)
			.innerJoin(
				passenger_table,
				eq(passenger_table.id, ticket_table.passengerId),
			)
			.innerJoin(flight_table, eq(flight_table.id, ticket_table.flightId))
			.innerJoin(route_table, eq(route_table.id, flight_table.routeId))
			.innerJoin(aircraft_table, eq(aircraft_table.id, flight_table.aircraftId))
			.innerJoin(
				departure_airport_table,
				eq(departure_airport_table.id, route_table.departureAirportId),
			)
			.innerJoin(
				arrival_airport_table,
				eq(arrival_airport_table.id, route_table.arrivalAirportId),
			)
			.innerJoin(airline_table, eq(airline_table.id, flight_table.airlineId))
			.where(eq(ticket_table.id, id));

		return ServerResponse.success(
			{
				ticket: tickets[0],
			},
			{
				message: "Ticket retrieved successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				ticket: null,
			},
			{
				message: "An error occurred while retrieving ticket.",
			},
		);
	}
}

export async function createTicket(data: TicketCreateData) {
	try {
		let passengers = await db
			.select()
			.from(passenger_table)
			.where(eq(passenger_table.phone, data.passengerPhone));

		if (passengers.length === 0) {
			passengers = await db
				.insert(passenger_table)
				.values({
					airlineId: data.airlineId,
					name: data.passengerName,
					phone: data.passengerPhone,
				})
				.returning();
		}

		const flightResponse = await getFlightById(data.flightId);

		if (
			flightResponse.status < 200 ||
			flightResponse.status >= 300 ||
			flightResponse.data.flight === null ||
			flightResponse.data.flight === undefined ||
			flightResponse.data.flight.status !== FlightStatus.Scheduled
		) {
			return ServerResponse.bad_request(
				{
					ticket: null,
				},
				{
					message: "Flight is not scheduled.",
				},
			);
		}

		if (
			flightResponse.data.flight.passengerCount ===
			flightResponse.data.flight.capacity
		) {
			return ServerResponse.bad_request(
				{
					ticket: null,
				},
				{
					message: "Flight is full.",
				},
			);
		}

		updateFlight(flightResponse.data.flight.id, {
			passengerCount: flightResponse.data.flight.passengerCount
				? flightResponse.data.flight.passengerCount + 1
				: 1,
		});

		const tickets = await db
			.insert(ticket_table)
			.values({
				flightId: data.flightId,
				passengerId: passengers[0].id,
			})
			.returning();

		return ServerResponse.created(
			{
				ticket: tickets[0],
			},
			{
				message: "Ticket created successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				ticket: null,
			},
			{
				message: "An error occurred while creating ticket.",
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

export async function updateTicket(id: string, data: TicketUpdateData) {
	try {
		const tickets = await db
			.update(ticket_table)
			.set({ ...data, updatedAt: getUnixTime(new Date()) })
			.where(eq(ticket_table.id, id))
			.returning();

		return ServerResponse.success(
			{
				ticket: tickets[0],
			},
			{
				message: "Ticket updated successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				ticket: null,
			},
			{
				message: "An error occurred while updating ticket.",
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

export async function deleteTicket(id: string) {
	try {
		const ticketResponse = await getTicketById(id);

		if (
			ticketResponse.status < 200 ||
			ticketResponse.status >= 300 ||
			ticketResponse.data.ticket === null ||
			ticketResponse.data.ticket === undefined
		) {
			return ServerResponse.not_found(
				{ ticket: null },
				{
					message: "Ticket not found.",
				},
			);
		}

		const flightsResponse = await getFlightById(
			ticketResponse.data.ticket.flightId,
		);

		if (
			flightsResponse.status < 200 ||
			flightsResponse.status >= 300 ||
			flightsResponse.data.flight === null ||
			flightsResponse.data.flight === undefined
		) {
			return ServerResponse.not_found(
				{ ticket: null },
				{
					message: "Flight not found.",
				},
			);
		}

		if (flightsResponse.data.flight.passengerCount > 0) {
			await updateFlight(flightsResponse.data.flight.id, {
				passengerCount: flightsResponse.data.flight.passengerCount - 1,
			});
		}

		await db.delete(ticket_table).where(eq(ticket_table.id, id));

		return ServerResponse.success(
			{ ticket: null },
			{
				message: "Ticket deleted successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{ ticket: null },
			{
				message: "An error occurred while deleting ticket.",
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
