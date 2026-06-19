import zod from "zod";

export const routeReadDataValidator = zod.object({
	id: zod.string(),
	departureCity: zod.string(),
	departureCountry: zod.string(),
	departureAirport: zod.string(),
	arrivalCity: zod.string(),
	arrivalCountry: zod.string(),
	arrivalAirport: zod.string(),
	durationMinutes: zod.coerce.number(),
});

export type RouteReadData = zod.infer<typeof routeReadDataValidator>;

export const routeCreateDataValidator = zod.object({
	departureAirportId: zod.string(),
	arrivalAirportId: zod.string(),
	durationMinutes: zod.coerce.number(),
});

export type RouteCreateData = zod.infer<typeof routeCreateDataValidator>;

export const routeUpdateDataValidator = zod.object({
	departureAirportId: zod.string().optional(),
	arrivalAirportId: zod.string().optional(),
	durationMinutes: zod.coerce.number().optional(),
});

export type RouteUpdateData = zod.infer<typeof routeUpdateDataValidator>;
