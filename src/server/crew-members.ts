"use server";

import { and, eq, isNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "~/db";
import { crew_member_table } from "~/db/tables";
import { ServerResponse } from "~/lib/handlers/response-handler";
import type {
	CrewMemberCreateData,
	CrewMemberReadData,
	CrewMemberRole,
	CrewMemberUpdateData,
} from "~/validators/crew-members";

export async function getCrewMembers(airlineId: string) {
	try {
		const crewMembers = await db
			.select({
				id: crew_member_table.id,
				name: crew_member_table.name,
				role: crew_member_table.role,
				aircraftId: crew_member_table.aircraftId,
			})
			.from(crew_member_table)
			.where(eq(crew_member_table.airlineId, airlineId));

		return ServerResponse.success<{ crewMembers: CrewMemberReadData[] }>(
			{
				crewMembers: crewMembers.map((crewMember) => ({
					...crewMember,
					role: crewMember.role as CrewMemberRole,
				})),
			},
			{
				message: "Crew members retrieved successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				crewMembers: [],
			},
			{
				message: "An error occurred while retrieving crew members.",
			},
		);
	}
}

export async function getAvailableCrewMembers(airlineId: string) {
	try {
		const crewMembers = await db
			.select({
				id: crew_member_table.id,
				name: crew_member_table.name,
				role: crew_member_table.role,
				aircraftId: crew_member_table.aircraftId,
			})
			.from(crew_member_table)
			.where(
				and(
					eq(crew_member_table.airlineId, airlineId),
					isNull(crew_member_table.aircraftId),
				),
			);

		return ServerResponse.success<{ crewMembers: CrewMemberReadData[] }>(
			{
				crewMembers: crewMembers.map((crewMember) => ({
					...crewMember,
					role: crewMember.role as CrewMemberRole,
				})),
			},
			{
				message: "Available crew members retrieved successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				crewMembers: [],
			},
			{
				message: "An error occurred while retrieving available crew members.",
			},
		);
	}
}

export async function createCrewMember(data: CrewMemberCreateData) {
	try {
		const crewMembers = await db
			.insert(crew_member_table)
			.values(data)
			.returning();

		return ServerResponse.created(
			{
				crewMember: crewMembers[0],
			},
			{
				message: "Crew member created successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				crewMember: null,
			},
			{
				message: "An error occurred while creating crew member.",
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

export async function updateCrewMember(id: string, data: CrewMemberUpdateData) {
	try {
		const crewMembers = await db
			.update(crew_member_table)
			.set(data)
			.where(eq(crew_member_table.id, id))
			.returning();

		return ServerResponse.success(
			{
				crewMember: crewMembers[0],
			},
			{
				message: "Crew member updated successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				crewMember: null,
			},
			{
				message: "An error occurred while updating crew member.",
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

export async function deleteCrewMember(id: string) {
	try {
		await db.delete(crew_member_table).where(eq(crew_member_table.id, id));

		return ServerResponse.success(
			{
				crewMember: null,
			},
			{
				message: "Crew member deleted successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				crewMember: null,
			},
			{
				message: "An error occurred while deleting crew member.",
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
