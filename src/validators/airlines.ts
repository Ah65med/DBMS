import zod from "zod";

export const airlineReadDataValidaor = zod.object({
	id: zod
		.string({
			message: "Airline ID is required.",
		})
		.min(1, {
			message: "Airline ID must be at least 1 characters long.",
		}),
	name: zod
		.string({
			message: "Name is required.",
		})
		.min(3, {
			message: "Name must be at least 3 characters long.",
		}),
	email: zod
		.string({
			message: "Email is required.",
		})
		.email({
			message: "Invalid email.",
		}),
	password: zod
		.string({
			message: "Password is required.",
		})
		.min(8, {
			message: "Password must be at least 8 characters long.",
		})
		.max(12, {
			message: "Password must be at most 12 characters long.",
		}),
	country: zod
		.string({
			message: "Country is required.",
		})
		.min(3, {
			message: "Country must be at least 3 characters long.",
		}),
	year: zod
		.number({
			message: "Year is required.",
		})
		.min(2000, {
			message: "Year must be at least 2000.",
		}),
});

export type AirlineReadData = zod.infer<typeof airlineReadDataValidaor>;

export const airlineSignUpDataValidator = zod.object({
	name: zod
		.string({
			message: "Name is required.",
		})
		.min(3, {
			message: "Name must be at least 3 characters long.",
		}),
	email: zod
		.string({
			message: "Email is required.",
		})
		.email({
			message: "Invalid email.",
		}),
	password: zod
		.string({
			message: "Password is required.",
		})
		.min(8, {
			message: "Password must be at least 8 characters long.",
		})
		.max(12, {
			message: "Password must be at most 12 characters long.",
		}),
	country: zod
		.string({
			message: "Country is required.",
		})
		.min(3, {
			message: "Country must be at least 3 characters long.",
		}),
	year: zod
		.number({
			message: "Year is required.",
		})
		.min(2000, {
			message: "Year must be at least 2000.",
		}),
});

export type AirlineSignUpData = zod.infer<typeof airlineSignUpDataValidator>;

export const airlineSignInDataValidator = zod.object({
	email: zod
		.string({
			message: "Email is required.",
		})
		.email({
			message: "Invalid email.",
		}),
	password: zod
		.string({
			message: "Password is required.",
		})
		.min(8, {
			message: "Password must be at least 8 characters long.",
		})
		.max(12, {
			message: "Password must be at most 12 characters long.",
		}),
});

export type AirlineSignInData = zod.infer<typeof airlineSignInDataValidator>;
