import { getUnixTime } from "date-fns";
import zod from "zod";

export const passengerReadDataValidator = zod.object({
	id: zod
		.string({
			message: "ID is required.",
		})
		.min(1, {
			message: "ID must be at least 1 characters long.",
		}),
	name: zod
		.string({
			message: "Name is required.",
		})
		.min(3, {
			message: "Name must be at least 3 characters long.",
		}),
	phone: zod
		.string({
			message: "Phone is required.",
		})
		.length(11, {
			message: "Phone must be at least 11 characters long.",
		}),
	registerationDate: zod
		.number({
			message: "Registeration Date is required.",
		})
		.min(getUnixTime(new Date()), {
			message: "Registeration Date must be at least today.",
		}),
});

export type PassengerReadData = zod.infer<typeof passengerReadDataValidator>;

export const passengerCreateDataValidator = zod.object({
	airlineId: zod
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
	phone: zod
		.string({
			message: "Phone is required.",
		})
		.min(11, {
			message: "Phone must be at least 11 characters long.",
		}),
});

export type PassengerCreateData = zod.infer<
	typeof passengerCreateDataValidator
>;
