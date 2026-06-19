import zod from "zod";

export const incidentReadDataValidator = zod.object({
	id: zod.string(),
	flightId: zod.string(),
	description: zod.string(),
	date: zod.date(),
});

export type IncidentReadData = zod.infer<typeof incidentReadDataValidator>;

export const incidentCreateDataValidator = zod.object({
	airlineId: zod.string(),
	flightId: zod.string(),
	description: zod.string(),
	date: zod.date(),
});

export type IncidentCreateData = zod.infer<typeof incidentCreateDataValidator>;
