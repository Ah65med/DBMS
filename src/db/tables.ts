import { getUnixTime } from "date-fns";
import { integer, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";
import { v4 as uuid } from "uuid";
import { AircraftStatus } from "~/validators/aircrafts";
import { FlightStatus } from "~/validators/flights";
import { MaintenanceStatus } from "~/validators/maintenances";

export const airline_table = sqliteTable("airline", {
	id: text("id").primaryKey().$default(uuid),
	name: text("name").unique().notNull(),
	email: text("email").unique().notNull(),
	password: text("password").notNull(),
	country: text("country").notNull(),
	year: integer("year").notNull(),
	createdAt: integer("created_at")
		.notNull()
		.$default(() => getUnixTime(new Date())),
	updatedAt: integer("updated_at")
		.notNull()
		.$default(() => getUnixTime(new Date())),
});

export const airport_table = sqliteTable("airport", {
	id: text("id").primaryKey().$default(uuid),
	name: text("name").notNull(),
	city: text("city").notNull(),
	country: text("country").notNull(),
	createdAt: integer("created_at")
		.notNull()
		.$default(() => getUnixTime(new Date())),
	updatedAt: integer("updated_at")
		.notNull()
		.$default(() => getUnixTime(new Date())),
});

export const aircraft_table = sqliteTable("aircraft", {
	id: text("id").primaryKey().$default(uuid),
	airlineId: text("airline_id").notNull(),
	status: text("status").notNull().default(AircraftStatus.Parked),
	make: text("make").notNull(),
	model: text("model").notNull(),
	capacity: integer("capacity").notNull(),
	pilotId: text("pilot_id"),
	createdAt: integer("created_at")
		.notNull()
		.$default(() => getUnixTime(new Date())),
	updatedAt: integer("updated_at")
		.notNull()
		.$default(() => getUnixTime(new Date())),
});

export const route_table = sqliteTable("route", {
	id: text("id").primaryKey().$default(uuid),
	departureAirportId: text("departure_airport_id").notNull(),
	arrivalAirportId: text("arrival_airport_id").notNull(),
	durationMinutes: integer("duration_minutes").notNull(),
	createdAt: integer("created_at")
		.notNull()
		.$default(() => getUnixTime(new Date())),
	updatedAt: integer("updated_at")
		.notNull()
		.$default(() => getUnixTime(new Date())),
});

export const flight_table = sqliteTable("flight", {
	id: text("id").primaryKey().$default(uuid),
	airlineId: text("airline_id").notNull(),
	routeId: text("route_id").notNull(),
	aircraftId: text("aircraft_id").notNull(),
	departure: integer("departure").notNull(),
	arrival: integer("arrival").notNull(),
	status: text("status").notNull().default(FlightStatus.Scheduled),
	price: integer("price").notNull(),
	passengerCount: integer("passenger_count").notNull().default(0),
	createdAt: integer("created_at")
		.notNull()
		.$default(() => getUnixTime(new Date())),
	updatedAt: integer("updated_at")
		.notNull()
		.$default(() => getUnixTime(new Date())),
});

export const pilot_table = sqliteTable("pilot", {
	id: text("id").primaryKey().$default(uuid),
	airlineId: text("airline_id").notNull(),
	aircraftId: text("aircraft_id"),
	name: text("name").notNull(),
	createdAt: integer("created_at")
		.notNull()
		.$default(() => getUnixTime(new Date())),
	updatedAt: integer("updated_at")
		.notNull()
		.$default(() => getUnixTime(new Date())),
});

export const crew_member_table = sqliteTable("crew_member", {
	id: text("id").primaryKey().$default(uuid),
	airlineId: text("airline_id").notNull(),
	aircraftId: text("aircraft_id"),
	name: text("name").notNull(),
	role: text("role").notNull(),
	createdAt: integer("created_at")
		.notNull()
		.$default(() => getUnixTime(new Date())),
	updatedAt: integer("updated_at")
		.notNull()
		.$default(() => getUnixTime(new Date())),
});

export const passenger_table = sqliteTable(
	"passenger",
	{
		id: text("id").primaryKey().$default(uuid),
		airlineId: text("airline_id").notNull(),
		name: text("name").notNull(),
		phone: text("phone").notNull(),
		createdAt: integer("created_at")
			.notNull()
			.$default(() => getUnixTime(new Date())),
		updatedAt: integer("updated_at")
			.notNull()
			.$default(() => getUnixTime(new Date())),
	},
	(table) => ({
		unique_airline_phone: unique().on(table.airlineId, table.phone),
	}),
);

export const ticket_table = sqliteTable("ticket", {
	id: text("id").primaryKey().$default(uuid),
	flightId: text("flight_id").notNull(),
	passengerId: text("passenger_id").notNull(),
	createdAt: integer("created_at")
		.notNull()
		.$default(() => getUnixTime(new Date())),
	updatedAt: integer("updated_at")
		.notNull()
		.$default(() => getUnixTime(new Date())),
});

export const maintenance_table = sqliteTable("maintenance", {
	id: text("id").primaryKey().$default(uuid),
	aircraftId: text("aircraft_id").notNull(),
	description: text("description").notNull(),
	status: text("status").notNull().default(MaintenanceStatus.Scheduled),
	startDate: integer("start_date").notNull(),
	endDate: integer("end_date"),
	createdAt: integer("created_at")
		.notNull()
		.$default(() => getUnixTime(new Date())),
	updatedAt: integer("updated_at")
		.notNull()
		.$default(() => getUnixTime(new Date())),
});

export const incident_table = sqliteTable("incident", {
	id: text("id").primaryKey().$default(uuid),
	flightId: text("flight_id").notNull(),
	description: text("description").notNull(),
	date: integer("date").notNull(),
	createdAt: integer("created_at")
		.notNull()
		.$default(() => getUnixTime(new Date())),
	updatedAt: integer("updated_at")
		.notNull()
		.$default(() => getUnixTime(new Date())),
});
