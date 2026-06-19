"use server";

import { fromUnixTime, getUnixTime } from "date-fns";
import { and, desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "~/db";
import { maintenance_table } from "~/db/tables";
import { ServerResponse } from "~/lib/handlers/response-handler";
import {
	MaintenanceStatus,
	type MaintenanceCreateData,
} from "~/validators/maintenances";

export async function getMaintenances(airlineId: string) {
	try {
		const maintenances = await db
			.select({
				id: maintenance_table.id,
				aircraftId: maintenance_table.aircraftId,
				description: maintenance_table.description,
				status: maintenance_table.status,
				startDate: maintenance_table.startDate,
				endDate: maintenance_table.endDate,
			})
			.from(maintenance_table)
			.orderBy(desc(maintenance_table.updatedAt));

		return ServerResponse.success(
			{
				maintenances: maintenances.map((maintenance) => ({
					...maintenance,
					startDate: fromUnixTime(maintenance.startDate),
					endDate: maintenance.endDate
						? fromUnixTime(maintenance.endDate)
						: null,
				})),
			},
			{
				message: "Maintenances retrieved successfully",
			},
		);
	} catch (error) {
		return ServerResponse.server_error(
			{
				maintenances: [],
			},
			{
				message: "An error occurred while retrieving maintenances",
			},
		);
	}
}

export async function getMaintenanceById(airlineId: string, id: string) {
	try {
		const maintenances = await db
			.select()
			.from(maintenance_table)
			.where(eq(maintenance_table.id, id));

		return ServerResponse.success(
			{
				maintenance: maintenances[0],
			},
			{
				message: "Maintenance retrieved successfully",
			},
		);
	} catch (error) {
		return ServerResponse.server_error(
			{
				maintenance: null,
			},
			{
				message: "An error occurred while retrieving maintenance",
			},
		);
	}
}

export async function getMaintenancesByAircraftId(
	airlineId: string,
	aircraftId: string,
) {
	try {
		const maintenances = await db
			.select()
			.from(maintenance_table)
			.where(eq(maintenance_table.aircraftId, aircraftId));

		return ServerResponse.success(
			{
				maintenances,
			},
			{
				message: "Maintenances retrieved successfully",
			},
		);
	} catch (error) {
		return ServerResponse.server_error(
			{
				maintenances: [],
			},
			{
				message: "An error occurred while retrieving maintenances",
			},
		);
	}
}

export async function getMaintenancesByStartDate(
	airlineId: string,
	startDate: Date,
) {
	try {
		const maintenances = await db
			.select()
			.from(maintenance_table)
			.where(eq(maintenance_table.startDate, getUnixTime(startDate)));

		return ServerResponse.success(
			{
				maintenances,
			},
			{
				message: "Maintenances retrieved successfully",
			},
		);
	} catch (error) {
		return ServerResponse.server_error(
			{
				maintenances: [],
			},
			{
				message: "An error occurred while retrieving maintenances",
			},
		);
	}
}

export async function getActiceMaintenances(_airlineId: string) {
	try {
		const maintenances = await db
			.select()
			.from(maintenance_table)
			.where(eq(maintenance_table.status, MaintenanceStatus.InProgress));

		return ServerResponse.success(
			{
				maintenances,
			},
			{
				message: "Active maintenances retrieved successfully",
			},
		);
	} catch (error) {
		return ServerResponse.server_error(
			{
				maintenances: [],
			},
			{
				message: "An error occurred while retrieving active maintenances",
			},
		);
	}
}

export async function getCompletedMaintenances(airlineId: string) {
	try {
		const maintenances = await db
			.select()
			.from(maintenance_table)
			.where(eq(maintenance_table.status, MaintenanceStatus.Completed));

		return ServerResponse.success(
			{
				maintenances,
			},
			{
				message: "Completed maintenances retrieved successfully",
			},
		);
	} catch (error) {
		return ServerResponse.server_error(
			{
				maintenances: [],
			},
			{
				message: "An error occurred while retrieving completed maintenances",
			},
		);
	}
}

export async function createMaintenance(data: MaintenanceCreateData) {
	try {
		const maintenances = await db
			.insert(maintenance_table)
			.values({
				...data,
				startDate: getUnixTime(data.startDate),
				endDate: data.endDate ? getUnixTime(data.endDate) : null,
			})
			.returning();

		return ServerResponse.success(
			{
				maintenance: maintenances[0],
			},
			{
				message: "Maintenance created successfully",
			},
		);
	} catch (error) {
		return ServerResponse.server_error(
			{
				maintenance: null,
			},
			{
				message: "An error occurred while creating maintenance",
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

export async function updateMaintenance(
	id: string,
	data: MaintenanceCreateData,
) {
	try {
		const maintenances = await db
			.update(maintenance_table)
			.set({
				...data,
				startDate: getUnixTime(data.startDate),
				endDate: data.endDate ? getUnixTime(data.endDate) : null,
				updatedAt: getUnixTime(new Date()),
			})
			.where(eq(maintenance_table.id, id))
			.returning();

		return ServerResponse.success(
			{
				maintenance: maintenances[0],
			},
			{
				message: "Maintenance updated successfully",
			},
		);
	} catch (error) {
		return ServerResponse.server_error(
			{
				maintenance: null,
			},
			{
				message: "An error occurred while updating maintenance",
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

export async function deleteMaintenance(id: string) {
	try {
		await db.delete(maintenance_table).where(eq(maintenance_table.id, id));

		return ServerResponse.success(
			{
				maintenance: null,
			},
			{
				message: "Maintenance deleted successfully",
			},
		);
	} catch (error) {
		return ServerResponse.server_error(
			{
				maintenance: null,
			},
			{
				message: "An error occurred while deleting maintenance",
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
