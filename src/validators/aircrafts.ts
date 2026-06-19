import zod from "zod";

export enum AircraftStatus {
	Parked = "parked",
	Booked = "booked",
	InFlight = "in-flight",
	OutForMaintenance = "out-for-maintenance",
}

export const aircraftDataValidator = zod.object({
	id: zod.string(),
	make: zod.string(),
	model: zod.string(),
	status: zod.enum([
		AircraftStatus.Parked,
		AircraftStatus.Booked,
		AircraftStatus.InFlight,
		AircraftStatus.OutForMaintenance,
	]),
	capacity: zod.number().min(1),
	pilotId: zod.string().nullable(),
	pilotName: zod.string().nullable(),
	crewMemberIds: zod.string().nullable(),
	crewMemberNames: zod.string().nullable(),
});

export type AircraftData = zod.infer<typeof aircraftDataValidator>;

export const aircraftInputValidator = zod.object({
	airlineId: zod.string(),
	make: zod.string(),
	model: zod.string(),
	status: zod.enum([
		AircraftStatus.Parked,
		AircraftStatus.Booked,
		AircraftStatus.InFlight,
		AircraftStatus.OutForMaintenance,
	]),
	capacity: zod.coerce.number().min(1, {
		message: "Capacity must be greater than 0.",
	}),
	pilotId: zod.string().min(1, {
		message: "A pilot is required.",
	}),
	crewMemberIds: zod
		.array(
			zod.object({
				label: zod.string(),
				value: zod.string(),
				disable: zod.boolean().optional(),
			}),
		)
		.min(1, {
			message: "At least one crew member is required.",
		}),
});

export type AircraftInput = zod.infer<typeof aircraftInputValidator>;
