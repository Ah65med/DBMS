"use server";

import { and, desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "~/db";
import { airline_table } from "~/db/tables";
import { ServerResponse } from "~/lib/handlers/response-handler";
import type { AirlineSignUpData } from "~/validators/airlines";

export async function getAirlineByNameAndEmail(country: string, name: string) {
	try {
		const airlines = await db
			.select()
			.from(airline_table)
			.where(
				and(eq(airline_table.country, country), eq(airline_table.name, name)),
			);

		return ServerResponse.success(
			{
				airline: airlines[0],
			},
			{
				message: "Airlines retrieved successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				airline: null,
			},
			{
				message: "An error occurred while retrieving airlines.",
			},
		);
	}
}

export async function signInAirline(email: string, password: string) {
	try {
		const airlines = await db
			.select()
			.from(airline_table)
			.where(
				and(
					eq(airline_table.email, email),
					eq(airline_table.password, password),
				),
			)
			.orderBy(desc(airline_table.updatedAt));

		return ServerResponse.success(
			{
				airline: airlines[0],
			},
			{
				message: "Sign in successful.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				airline: null,
			},
			{
				message: "Invalid email or password.",
			},
		);
	}
}

export async function signUpAirline(data: AirlineSignUpData) {
	try {
		const airlineExists = await getAirlineByNameAndEmail(data.name, data.email);

		if (airlineExists.data.airline) {
			return ServerResponse.bad_request(
				{
					airline: null,
				},
				{
					message: "Airline already exists.",
				},
			);
		}

		const airlines = await db.insert(airline_table).values(data).returning();

		return ServerResponse.created(
			{
				airline: airlines[0],
			},
			{
				message: "Sign up successful.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				airline: null,
			},
			{
				message: "An error occurred while signing up.",
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
