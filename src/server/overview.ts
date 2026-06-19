import { fromUnixTime, getUnixTime } from "date-fns";
import { and, desc, eq, gte, lt } from "drizzle-orm";
import { db } from "~/db";
import { flight_table, passenger_table, ticket_table } from "~/db/tables";
import { ServerResponse } from "~/lib/handlers/response-handler";
import { FlightStatus } from "~/validators/flights";

export async function getOverviewData() {
	try {
		const numberOfActiveFlights = (
			await db
				.select()
				.from(flight_table)
				.where(eq(flight_table.status, FlightStatus.InFlight))
		).length;

		const numberOfScheduledFlights = (
			await db
				.select()
				.from(flight_table)
				.where(eq(flight_table.status, FlightStatus.Scheduled))
		).length;

		const numberOfTicketsSold = (await db.select().from(ticket_table)).length;

		const numberOfPassengers = (await db.select().from(passenger_table)).length;

		const passengerInJan = (
			await db
				.select()
				.from(passenger_table)
				.where(
					and(
						gte(passenger_table.createdAt, getUnixTime(new Date("2024-01-01"))),
						lt(passenger_table.createdAt, getUnixTime(new Date("2024-02-01"))),
					),
				)
		).length;

		const passengerInFeb = (
			await db
				.select()
				.from(passenger_table)
				.where(
					and(
						gte(passenger_table.createdAt, getUnixTime(new Date("2024-02-01"))),
						lt(passenger_table.createdAt, getUnixTime(new Date("2024-03-01"))),
					),
				)
		).length;

		const passengerInMar = (
			await db
				.select()
				.from(passenger_table)
				.where(
					and(
						gte(passenger_table.createdAt, getUnixTime(new Date("2024-03-01"))),
						lt(passenger_table.createdAt, getUnixTime(new Date("2024-04-01"))),
					),
				)
		).length;

		const passengerInApr = (
			await db
				.select()
				.from(passenger_table)
				.where(
					and(
						gte(passenger_table.createdAt, getUnixTime(new Date("2024-04-01"))),
						lt(passenger_table.createdAt, getUnixTime(new Date("2024-05-01"))),
					),
				)
		).length;

		const passengerInMay = (
			await db
				.select()
				.from(passenger_table)
				.where(
					and(
						gte(passenger_table.createdAt, getUnixTime(new Date("2024-05-01"))),
						lt(passenger_table.createdAt, getUnixTime(new Date("2024-06-01"))),
					),
				)
		).length;

		const passengerInJun = (
			await db
				.select()
				.from(passenger_table)
				.where(
					and(
						gte(passenger_table.createdAt, getUnixTime(new Date("2024-06-01"))),
						lt(passenger_table.createdAt, getUnixTime(new Date("2024-07-01"))),
					),
				)
		).length;

		const passengerInJul = (
			await db
				.select()
				.from(passenger_table)
				.where(
					and(
						gte(passenger_table.createdAt, getUnixTime(new Date("2024-07-01"))),
						lt(passenger_table.createdAt, getUnixTime(new Date("2024-08-01"))),
					),
				)
		).length;

		const passengerInAug = (
			await db
				.select()
				.from(passenger_table)
				.where(
					and(
						gte(passenger_table.createdAt, getUnixTime(new Date("2024-08-01"))),
						lt(passenger_table.createdAt, getUnixTime(new Date("2024-09-01"))),
					),
				)
		).length;

		const passengerInSep = (
			await db
				.select()
				.from(passenger_table)
				.where(
					and(
						gte(passenger_table.createdAt, getUnixTime(new Date("2024-09-01"))),
						lt(passenger_table.createdAt, getUnixTime(new Date("2024-10-01"))),
					),
				)
		).length;

		const passengerInOct = (
			await db
				.select()
				.from(passenger_table)
				.where(
					and(
						gte(passenger_table.createdAt, getUnixTime(new Date("2024-10-01"))),
						lt(passenger_table.createdAt, getUnixTime(new Date("2024-11-01"))),
					),
				)
		).length;

		const passengerInNov = (
			await db
				.select()
				.from(passenger_table)
				.where(
					and(
						gte(passenger_table.createdAt, getUnixTime(new Date("2024-11-01"))),
						lt(passenger_table.createdAt, getUnixTime(new Date("2024-12-01"))),
					),
				)
		).length;

		const passengerInDec = (
			await db
				.select()
				.from(passenger_table)
				.where(
					and(
						gte(passenger_table.createdAt, getUnixTime(new Date("2024-12-01"))),
						lt(passenger_table.createdAt, getUnixTime(new Date("2025-01-01"))),
					),
				)
		).length;

		const passengerTraficData = [
			{
				name: "Jan",
				total: passengerInJan,
			},
			{
				name: "Feb",
				total: passengerInFeb,
			},
			{
				name: "Mar",
				total: passengerInMar,
			},
			{
				name: "Apr",
				total: passengerInApr,
			},
			{
				name: "May",
				total: passengerInMay,
			},
			{
				name: "Jun",
				total: passengerInJun,
			},
			{
				name: "Jul",
				total: passengerInJul,
			},
			{
				name: "Aug",
				total: passengerInAug,
			},
			{
				name: "Sep",
				total: passengerInSep,
			},
			{
				name: "Oct",
				total: passengerInOct,
			},
			{
				name: "Nov",
				total: passengerInNov,
			},
			{
				name: "Dec",
				total: passengerInDec,
			},
		];

		const recentBookingsData = await db
			.select({
				name: passenger_table.name,
				phone: passenger_table.phone,
				date: ticket_table.updatedAt,
			})
			.from(ticket_table)
			.innerJoin(
				passenger_table,
				eq(passenger_table.id, ticket_table.passengerId),
			)
			.innerJoin(
				flight_table,
				and(
					eq(flight_table.id, ticket_table.flightId),
					eq(flight_table.status, FlightStatus.Scheduled),
				),
			)
			.orderBy(desc(ticket_table.updatedAt))
			.limit(5);

		return ServerResponse.success(
			{
				numberOfActiveFlights,
				numberOfScheduledFlights,
				numberOfTicketsSold,
				numberOfPassengers,
				passengerTraficData,
				recentBookingsData: recentBookingsData.map((booking) => ({
					...booking,
					date: fromUnixTime(booking.date),
				})),
			},
			{
				message: "Overview details retrieved successfully",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				numberOfActiveFlights: 0,
				numberOfScheduledFlights: 0,
				numberOfTicketsSold: 0,
				numberOfPassengers: 0,
				passengerTraficData: [],
				recentBookingsData: [],
			},
			{
				message: "Failed to retrieve overview details",
			},
		);
	}
}
