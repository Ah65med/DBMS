import zod from "zod";

export const pilotsCreateDataValidator = zod.object({
	id: zod
		.string({
			message: "Id is required",
		})
		.min(1, {
			message: "Id must be at least 1 characters long",
		}),
	name: zod
		.string({
			message: "Name is required",
		})
		.min(3, {
			message: "Name must be at least 3 characters long",
		}),
	aircraftId: zod
		.string({
			message: "Aircraft is required",
		})
		.min(1, {
			message: "Aircraft must be at least 1 characters long",
		})
		.nullable(),
});

export type PilotCreateData = zod.infer<typeof pilotsCreateDataValidator>;

export const pilotsInputValidator = zod.object({
	airlineId: zod
		.string()
		.min(1, {
			message: "Airline is required",
		})
		.min(1, {
			message: "Airline Id must be at least 1 characters long",
		}),
	name: zod
		.string({
			message: "Name is required",
		})
		.min(3, {
			message: "Name must be at least 3 characters long",
		}),
	aircraftId: zod
		.string({
			message: "Aircraft is required",
		})
		.min(1, {
			message: "Aircraft Id must be at least 1 characters long",
		})
		.nullable(),
});

export type PilotInput = zod.infer<typeof pilotsInputValidator>;
