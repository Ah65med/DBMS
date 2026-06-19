"use server";

import { addDays, fromUnixTime, getUnixTime } from "date-fns";
import { and, desc, eq, gte, lt } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "~/db";
import { incident_table } from "~/db/tables";
import { ServerResponse } from "~/lib/handlers/response-handler";
import type {
	IncidentCreateData,
	IncidentReadData,
} from "~/validators/incidents";

export async function getIncidents(airlineId: string) {
	try {
		const incidents = await db
			.select({
				id: incident_table.id,
				flightId: incident_table.flightId,
				description: incident_table.description,
				date: incident_table.date,
			})
			.from(incident_table)
			.orderBy(desc(incident_table.date));

		return ServerResponse.success(
			{
				incidents: incidents.map((incident) => ({
					...incident,
					date: fromUnixTime(incident.date),
				})),
			},
			{
				message: "Incidents retrieved successfully",
			},
		);
	} catch (error) {
		return ServerResponse.server_error(
			{
				incidents: [],
			},
			{
				message: "An error occurred while retrieving incidents",
			},
		);
	}
}

export async function getIncidentById(airlineId: string, id: string) {
	try {
		const incidents = await db
			.select()
			.from(incident_table)
			.where(eq(incident_table.id, id))
			.orderBy(desc(incident_table.date));

		return ServerResponse.success(
			{
				incident: incidents[0],
			},
			{
				message: "Incident retrieved successfully",
			},
		);
	} catch (error) {
		return ServerResponse.server_error(
			{
				incident: null,
			},
			{
				message: "An error occurred while retrieving incident",
			},
		);
	}
}

export async function getIncidentsByFlightId(
	airlineId: string,
	flightId: string,
) {
	try {
		const incidents = await db
			.select()
			.from(incident_table)
			.where(eq(incident_table.flightId, flightId))
			.orderBy(desc(incident_table.date));

		return ServerResponse.success(
			{
				incidents,
			},
			{
				message: "Incidents retrieved successfully",
			},
		);
	} catch (error) {
		return ServerResponse.server_error(
			{
				incidents: [],
			},
			{
				message: "An error occurred while retrieving incidents",
			},
		);
	}
}

export async function getIncidentsByDate(airlineId: string, date: Date) {
	try {
		const incidents = await db
			.select()
			.from(incident_table)
			.where(
				and(
					gte(incident_table.date, getUnixTime(date.toLocaleDateString())),
					lt(
						incident_table.date,
						getUnixTime(addDays(date, 1).toLocaleDateString()),
					),
				),
			)
			.orderBy(desc(incident_table.date));

		return ServerResponse.success(
			{
				incidents,
			},
			{
				message: "Incidents retrieved successfully",
			},
		);
	} catch (error) {
		return ServerResponse.server_error(
			{
				incidents: [],
			},
			{
				message: "An error occurred while retrieving incidents",
			},
		);
	}
}

export async function createIncident(data: IncidentCreateData) {
	try {
		const incidents = await db
			.insert(incident_table)
			.values({
				flightId: data.flightId,
				description: data.description,
				date: getUnixTime(data.date),
			})
			.returning();

		return ServerResponse.created(
			{
				incident: incidents[0],
			},
			{
				message: "Incident created successfully",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				incident: null,
			},
			{
				message: "An error occurred while creating incident",
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

export async function updateIncident(id: string, data: IncidentReadData) {
	try {
		const incidents = await db
			.update(incident_table)
			.set({
				...data,
				date: getUnixTime(data.date),
				updatedAt: getUnixTime(new Date()),
			})
			.where(eq(incident_table.id, id))
			.returning();

		return ServerResponse.created(
			{
				incident: incidents[0],
			},
			{
				message: "Incident updated successfully",
			},
		);
	} catch (error) {
		return ServerResponse.server_error(
			{
				incident: null,
			},
			{
				message: "An error occurred while updating incident",
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

export async function deleteIncident(id: string) {
	try {
		await db.delete(incident_table).where(eq(incident_table.id, id));

		return ServerResponse.created(
			{
				incident: null,
			},
			{
				message: "Incident deleted successfully",
			},
		);
	} catch (error) {
		return ServerResponse.server_error(
			{
				incident: null,
			},
			{
				message: "An error occurred while deleting incident",
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
