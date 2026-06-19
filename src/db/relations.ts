import { relations } from "drizzle-orm";
import {
	aircraft_table,
	airline_table,
	airport_table,
	crew_member_table,
	flight_table,
	incident_table,
	maintenance_table,
	passenger_table,
	pilot_table,
	route_table,
	ticket_table,
} from "~/db/tables";

export const airline_relations = relations(airline_table, ({ many }) => ({
	aircrafts: many(aircraft_table),
	flights: many(flight_table),
	pilots: many(pilot_table),
	crewMembers: many(crew_member_table),
	passengers: many(passenger_table),
}));

export const aircraft_relations = relations(
	aircraft_table,
	({ one, many }) => ({
		airline: one(airline_table, {
			fields: [aircraft_table.airlineId],
			references: [airline_table.id],
		}),
		pilot: one(pilot_table, {
			fields: [aircraft_table.pilotId],
			references: [pilot_table.id],
		}),
		crewMembers: many(crew_member_table),
		flights: many(flight_table),
		maintenances: many(maintenance_table),
	}),
);

export const airport_relations = relations(airport_table, ({ one, many }) => ({
	arrivalRoutes: many(route_table, {
		relationName: "arrivalAirport",
	}),
	departureRoutes: many(route_table, {
		relationName: "departureAirport",
	}),
}));

export const route_relations = relations(route_table, ({ one, many }) => ({
	flights: many(flight_table),
	arrivalAirport: one(airport_table, {
		fields: [route_table.arrivalAirportId],
		references: [airport_table.id],
		relationName: "arrivalAirport",
	}),
	departureAirport: one(airport_table, {
		fields: [route_table.departureAirportId],
		references: [airport_table.id],
		relationName: "departureAirport",
	}),
}));

export const flight_relations = relations(flight_table, ({ one, many }) => ({
	airline: one(airline_table, {
		fields: [flight_table.airlineId],
		references: [airline_table.id],
	}),
	route: one(route_table, {
		fields: [flight_table.routeId],
		references: [route_table.id],
	}),
	aircraft: one(aircraft_table, {
		fields: [flight_table.aircraftId],
		references: [aircraft_table.id],
	}),
	tickets: many(ticket_table),
	incidents: many(incident_table),
}));

export const pilot_relations = relations(pilot_table, ({ one, many }) => ({
	airline: one(airline_table, {
		fields: [pilot_table.airlineId],
		references: [airline_table.id],
	}),
	aircrafts: one(aircraft_table, {
		fields: [pilot_table.aircraftId],
		references: [aircraft_table.id],
	}),
}));

export const crew_member_relations = relations(
	crew_member_table,
	({ one, many }) => ({
		airline: one(airline_table, {
			fields: [crew_member_table.airlineId],
			references: [airline_table.id],
		}),
		aircraft: one(aircraft_table, {
			fields: [crew_member_table.aircraftId],
			references: [aircraft_table.id],
		}),
	}),
);

export const passenger_relations = relations(
	passenger_table,
	({ one, many }) => ({
		airline: one(airline_table, {
			fields: [passenger_table.airlineId],
			references: [airline_table.id],
		}),
		tickets: many(ticket_table),
	}),
);

export const ticket_relations = relations(ticket_table, ({ one }) => ({
	flight: one(flight_table, {
		fields: [ticket_table.flightId],
		references: [flight_table.id],
	}),
	passenger: one(passenger_table, {
		fields: [ticket_table.passengerId],
		references: [passenger_table.id],
	}),
}));

export const maintenance_relations = relations(
	maintenance_table,
	({ one }) => ({
		aircraft: one(aircraft_table, {
			fields: [maintenance_table.aircraftId],
			references: [aircraft_table.id],
		}),
	}),
);

export const incident_relations = relations(incident_table, ({ one }) => ({
	flight: one(flight_table, {
		fields: [incident_table.flightId],
		references: [flight_table.id],
	}),
}));
