import zod from "zod";

export enum MaintenanceStatus {
	Scheduled = "scheduled",
	Completed = "completed",
	InProgress = "in-progress",
}

export const maintenanceReadDataValidator = zod.object({
	id: zod.string(),
	aircraftId: zod.string(),
	description: zod.string(),
	status: zod.enum([
		MaintenanceStatus.Scheduled,
		MaintenanceStatus.Completed,
		MaintenanceStatus.InProgress,
	]),
	startDate: zod.date(),
	endDate: zod.date().nullable(),
});

export type MaintenanceReadData = zod.infer<
	typeof maintenanceReadDataValidator
>;

export const maintenanceCreateDataValidator = zod.object({
	airlineId: zod.string(),
	aircraftId: zod.string(),
	description: zod.string(),
	status: zod.enum([
		MaintenanceStatus.Scheduled,
		MaintenanceStatus.Completed,
		MaintenanceStatus.InProgress,
	]),
	startDate: zod.date(),
	endDate: zod.date(),
});

export type MaintenanceCreateData = zod.infer<
	typeof maintenanceCreateDataValidator
>;
