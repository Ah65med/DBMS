import zod from "zod";

export const airportReadDataValidator = zod.object({
	id: zod
		.string({
			message: "Airport ID is required",
		})
		.min(1, {
			message: "Airport ID must be at least 1 characters long.",
		}),
	name: zod
		.string({
			message: "Name is required",
		})
		.min(3, {
			message: "Name must be at least 3 characters long.",
		}),
	city: zod
		.string({
			message: "City is required",
		})
		.min(3, {
			message: "City must be at least 3 characters long.",
		}),
	country: zod
		.string({
			message: "Country is required",
		})
		.min(3, {
			message: "Country must be at least 3 characters long.",
		}),
});

export type AirportReadData = zod.infer<typeof airportReadDataValidator>;

export const airportCreateDataValidator = zod.object({
	airlineId: zod
		.string({
			message: "Airline is required",
		})
		.min(1, {
			message: "Airline Id must be at least 1 characters long.",
		}),
	name: zod
		.string({
			message: "Name is required",
		})
		.min(3, {
			message: "Name must be at least 3 characters long.",
		}),
	city: zod
		.string({
			message: "City is required",
		})
		.min(3, {
			message: "City must be at least 3 characters long.",
		}),
	country: zod
		.string({
			message: "Country is required",
		})
		.min(3, {
			message: "Country must be at least 3 characters long.",
		}),
});

export type AirportCreateData = zod.infer<typeof airportCreateDataValidator>;

export const airportUpdateDataValidator = zod.object({
	name: zod
		.string({
			message: "Name is required",
		})
		.min(3, {
			message: "Name must be at least 3 characters long.",
		})
		.optional(),
	city: zod
		.string({
			message: "City is required",
		})
		.min(3, {
			message: "City must be at least 3 characters long.",
		})
		.optional(),
	country: zod
		.string({
			message: "Country is required",
		})
		.min(3, {
			message: "Country must be at least 3 characters long.",
		})
		.optional(),
});

export type AirportUpdateData = zod.infer<typeof airportUpdateDataValidator>;
