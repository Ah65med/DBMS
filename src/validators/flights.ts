import zod from "zod";

export enum FlightStatus {
	Scheduled = "scheduled",
	Cancelled = "cancelled",
	InFlight = "in-flight",
	Comepleted = "completed",
}

export const flightReadDataValidator = zod.object({
	id: zod.string(),
	aircraftMake: zod.string(),
	aircraftModel: zod.string(),
	routeId: zod.string(),
	departureTime: zod.date(),
	arrivalTime: zod.date(),
	status: zod.enum([
		FlightStatus.Scheduled,
		FlightStatus.Cancelled,
		FlightStatus.InFlight,
		FlightStatus.Comepleted,
	]),
	price: zod.number(),
	departureCity: zod.string(),
	departureCountry: zod.string(),
	departureAirport: zod.string(),
	arrivalCity: zod.string(),
	arrivalCountry: zod.string(),
	arrivalAirport: zod.string(),
	capacity: zod.number(),
	passengerCount: zod.number(),
});

export type FlightReadData = zod.infer<typeof flightReadDataValidator>;

export const flightCreateDataValidator = zod.object({
	airlineId: zod.string().min(1, {
		message: "Airline is required",
	}),
	aircraftId: zod.string().min(1, {
		message: "Aircraft is required",
	}),
	aircraftPilotId: zod.string().min(1, {
		message: "Aircraft pilot is required",
	}),
	aircraftCrewIds: zod.array(zod.string()).min(1, {
		message: "Aircraft crew is required",
	}),
	routeId: zod.string().min(1, {
		message: "Route is required",
	}),
	departure: zod.date().min(new Date(), {
		message: "Departure date must be in the future",
	}),
	arrival: zod.date().min(new Date(), {
		message: "Arrival date must be in the future",
	}),
	price: zod.coerce.number().min(1, {
		message: "Price must be a positive number",
	}),
});

export type FlightCreateData = zod.infer<typeof flightCreateDataValidator>;

export const flightUpdateDataValidator = zod.object({
	airlineId: zod
		.string()
		.min(1, {
			message: "Airline is required",
		})
		.optional(),
	aircraftId: zod
		.string()
		.min(1, {
			message: "Aircraft is required",
		})
		.optional(),
	aircraftPilotId: zod
		.string()
		.min(1, {
			message: "Aircraft pilot is required",
		})
		.optional(),
	aircraftCrewIds: zod
		.array(zod.string())
		.min(1, {
			message: "Aircraft crew is required",
		})
		.optional(),
	routeId: zod
		.string()
		.min(1, {
			message: "Route is required",
		})
		.optional(),
	status: zod
		.enum([
			FlightStatus.Scheduled,
			FlightStatus.Cancelled,
			FlightStatus.InFlight,
			FlightStatus.Comepleted,
		])
		.optional(),
	departure: zod
		.date()
		.min(new Date(), {
			message: "Departure date must be in the future",
		})
		.optional(),
	arrival: zod
		.date()
		.min(new Date(), {
			message: "Arrival date must be in the future",
		})
		.optional(),
	price: zod.coerce
		.number()
		.min(1, {
			message: "Price must be a positive number",
		})
		.optional(),

	passengerCount: zod
		.number({
			message: "Passenger count must be a number",
		})
		.min(0, {
			message: "Passenger count must be a positive number",
		})
		.optional(),
});

export type FlightUpdateData = zod.infer<typeof flightUpdateDataValidator>;
