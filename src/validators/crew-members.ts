import zod from "zod";

export enum CrewMemberRole {
	Host = "host",
	Cook = "cook",
	Security = "security",
}

export const crewMemberReadDataValidator = zod.object({
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
	role: zod.enum([
		CrewMemberRole.Host,
		CrewMemberRole.Cook,
		CrewMemberRole.Security,
	]),
	aircraftId: zod
		.string({
			message: "Aircraft is required",
		})
		.min(1, {
			message: "Aircraft must be at least 1 characters long",
		})
		.nullable(),
});

export type CrewMemberReadData = zod.infer<typeof crewMemberReadDataValidator>;

export const crewMemberCreateDataValidator = zod.object({
	airlineId: zod.string().min(1, {
		message: "Airline Id must be at least 1 characters long",
	}),
	name: zod
		.string({
			message: "Name is required",
		})
		.min(3, {
			message: "Name must be at least 3 characters long",
		}),
	role: zod.enum([
		CrewMemberRole.Host,
		CrewMemberRole.Cook,
		CrewMemberRole.Security,
	]),
	aircraftId: zod
		.string({
			message: "Aircraft is required",
		})
		.min(1, {
			message: "Aircraft must be at least 1 characters long",
		})
		.nullable(),
});

export type CrewMemberCreateData = zod.infer<
	typeof crewMemberCreateDataValidator
>;

export const crewMemberUpdateDataValidator = zod.object({
	name: zod
		.string({
			message: "Name is required",
		})
		.min(3, {
			message: "Name must be at least 3 characters long",
		}),
	role: zod.enum([
		CrewMemberRole.Host,
		CrewMemberRole.Cook,
		CrewMemberRole.Security,
	]),
	aircraftId: zod
		.string({
			message: "Aircraft is required",
		})
		.min(1, {
			message: "Aircraft must be at least 1 characters long",
		})
		.nullable(),
});

export type CrewMemberUpdateData = zod.infer<
	typeof crewMemberUpdateDataValidator
>;
