import * as zod from "zod";

export const ticketReadDataValidator = zod.object({
	id: zod.string(),
	passengerName: zod.string(),
	passengerPhone: zod.string(),
	airlineName: zod.string(),
	aircraftMake: zod.string(),
	aircraftModel: zod.string(),
	departureAirport: zod.string(),
	departureCity: zod.string(),
	departureCountry: zod.string(),
	departureTime: zod.date(),
	arrivalAirport: zod.string(),
	arrivalCity: zod.string(),
	arrivalCountry: zod.string(),
	arrivalTime: zod.date(),
	price: zod.number(),
});

export type TicketReadData = zod.infer<typeof ticketReadDataValidator>;

export const ticketCreateDataValidator = zod.object({
	airlineId: zod.string().min(1, {
		message: "Airline must be selected",
	}),
	flightId: zod.string().min(1, {
		message: "Flight must be selected",
	}),
	passengerName: zod.string().min(3, {
		message: "Name must be at least 3 characters long",
	}),
	passengerPhone: zod.string().min(11, {
		message: "Phone number must be at least 11 characters long",
	}),
});

export type TicketCreateData = zod.infer<typeof ticketCreateDataValidator>;

export const ticketUpdateDataValidator = zod.object({
	passengerName: zod.string().min(3, {
		message: "Name must be at least 3 characters long",
	}),
	passengerPhone: zod.string().min(11, {
		message: "Phone number must be at least 11 characters long",
	}),
});

export type TicketUpdateData = zod.infer<typeof ticketUpdateDataValidator>;
