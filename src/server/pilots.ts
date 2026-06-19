"use server";

import { and, desc, eq, isNotNull, isNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "~/db";
import { aircraft_table, pilot_table } from "~/db/tables";
import { ServerResponse } from "~/lib/handlers/response-handler";
import type { PilotInput } from "~/validators/pilots";

export async function getPilots(airlineId: string) {
	try {
		const pilots = await db
			.select()
			.from(pilot_table)
			.where(eq(pilot_table.airlineId, airlineId))
			.orderBy(desc(pilot_table.updatedAt));

		return ServerResponse.success(
			{
				pilots,
			},
			{
				message: "Pilots retrieved successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				pilots: [],
			},
			{
				message: "An error occurred while retrieving pilots.",
			},
		);
	}
}

export async function getPilotById(airlineId: string, id: string) {
	try {
		const pilots = await db
			.select()
			.from(pilot_table)
			.where(and(eq(pilot_table.airlineId, airlineId), eq(pilot_table.id, id)));

		return ServerResponse.success(
			{
				pilot: pilots[0],
			},
			{
				message: "Pilot retrieved successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				pilot: null,
			},
			{
				message: "An error occurred while retrieving pilot.",
			},
		);
	}
}

export async function getPilotByAircraftId(
	airlineId: string,
	aircraftId: string,
) {
	try {
		const pilots = await db
			.select()
			.from(pilot_table)
			.where(
				and(
					eq(pilot_table.airlineId, airlineId),
					eq(pilot_table.aircraftId, aircraftId),
				),
			);

		return ServerResponse.success(
			{
				pilot: pilots[0],
			},
			{
				message: "Pilot retrieved successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				pilot: null,
			},
			{
				message: "An error occurred while retrieving pilot.",
			},
		);
	}
}

export async function getPilotsByName(airlineId: string, name: string) {
	try {
		const pilots = await db
			.select()
			.from(pilot_table)
			.where(
				and(eq(pilot_table.airlineId, airlineId), eq(pilot_table.name, name)),
			);

		return ServerResponse.success(
			{
				pilots,
			},
			{
				message: "Pilots retrieved successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				pilots: [],
			},
			{
				message: "An error occurred while retrieving pilots.",
			},
		);
	}
}

export async function getAvailablePilots(airlineId: string) {
	try {
		const pilots = await db
			.select()
			.from(pilot_table)
			.where(
				and(
					eq(pilot_table.airlineId, airlineId),
					isNull(pilot_table.aircraftId),
				),
			);

		return ServerResponse.success(
			{
				pilots,
			},
			{
				message: "Pilots retrieved successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				pilots: [],
			},
			{
				message: "An error occurred while retrieving pilots.",
			},
		);
	}
}

export async function getBookedPilots(airlineId: string) {
	try {
		const pilots = await db
			.select()
			.from(pilot_table)
			.where(
				and(
					eq(pilot_table.airlineId, airlineId),
					isNotNull(pilot_table.aircraftId),
				),
			);

		return ServerResponse.success(
			{
				pilots,
			},
			{
				message: "Pilots retrieved successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				pilots: [],
			},
			{
				message: "An error occurred while retrieving pilots.",
			},
		);
	}
}

export async function createPilot(data: PilotInput) {
	try {
		const pilots = await db.insert(pilot_table).values(data).returning();

		return ServerResponse.success(
			{
				pilot: pilots[0],
			},
			{
				message: "Pilot created successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				pilot: [],
			},
			{
				message: "An error occurred while creating pilot.",
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

export async function updatePilot(id: string, data: PilotInput) {
	try {
		if (data.aircraftId) {
			await db
				.update(aircraft_table)
				.set({
					pilotId: null,
				})
				.where(eq(aircraft_table.pilotId, id));
		}

		const pilots = await db
			.update(pilot_table)
			.set(data)
			.where(eq(pilot_table.id, id))
			.returning();

		return ServerResponse.success(
			{
				pilot: pilots[0],
			},
			{
				message: "Pilot updated successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				pilot: [],
			},
			{
				message: "An error occurred while updating pilot.",
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

export async function deletePilot(id: string) {
	try {
		await db
			.update(aircraft_table)
			.set({
				pilotId: null,
			})
			.where(eq(aircraft_table.pilotId, id));

		await db.delete(pilot_table).where(eq(pilot_table.id, id));

		return ServerResponse.success(
			{
				pilot: null,
			},
			{
				message: "Pilot deleted successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				pilot: null,
			},
			{
				message: "An error occurred while deleting pilot.",
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
