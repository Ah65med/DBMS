"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import type { DialogClose } from "~/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { toast } from "~/components/ui/use-toast";
import { createRoute } from "~/server/routes";
import type { AirportReadData } from "~/validators/airports";
import {
	type RouteCreateData,
	routeCreateDataValidator,
} from "~/validators/routes";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

interface RouteFormProps {
	airports: AirportReadData[];
	CloseDialog?: typeof DialogClose;
}

export function RouteForm({ airports, CloseDialog }: Readonly<RouteFormProps>) {
	const form = useForm<RouteCreateData>({
		resolver: zodResolver(routeCreateDataValidator),
		defaultValues: {
			arrivalAirportId: "",
			departureAirportId: "",
			durationMinutes: 0,
		},
	});

	async function onSubmit(data: RouteCreateData) {
		try {
			const response = await createRoute(data);

			toast({
				title: response.message,
				description: (
					<pre className="mt-1 w-[340px] rounded-md p-1">
						<code>{JSON.stringify(response.data.route, null, 2)}</code>
					</pre>
				),
				variant: "default",
			});
		} catch (error) {
			if (error instanceof Error) {
				toast({
					title: "Error occurred",
					description: JSON.stringify(error.message, null, 2),
					variant: "destructive",
				});
			}
		} finally {
			form.reset();
		}
	}

	const [departure, setDeparture] = useState("");
	const [arrival, setArrival] = useState("");

	const filteredDepartureAirports = airports.filter((airport) => {
		const [departureCity, departureCountry] = departure.split(", ");

		return (
			(departureCity === undefined ||
				departureCity === "" ||
				departureCity === airport.city) &&
			(departureCountry === undefined ||
				departureCountry === "" ||
				departureCountry === airport.country)
		);
	});

	const filteredArrivalAirports = airports.filter((airport) => {
		const [arrivalCity, arrivalCountry] = arrival.split(", ");

		return (
			(arrivalCity === undefined ||
				arrivalCity === "" ||
				arrivalCity === airport.city) &&
			(arrivalCountry === undefined ||
				arrivalCountry === "" ||
				arrivalCountry === airport.country)
		);
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<div className="space-x-6 flex items-center">
					<FormItem>
						<FormLabel>Departure</FormLabel>
						<FormControl>
							<Input
								value={departure}
								onChange={(event) => {
									setDeparture(event.target.value);
								}}
								placeholder="Karachi, Pakistan"
							/>
						</FormControl>
					</FormItem>
					<FormItem>
						<FormLabel>Arrival</FormLabel>
						<FormControl>
							<Input
								value={arrival}
								onChange={(event) => {
									setArrival(event.target.value);
								}}
								placeholder="New York, USA"
							/>
						</FormControl>
					</FormItem>
				</div>
				<FormField
					control={form.control}
					name="departureAirportId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Departure Airport</FormLabel>
							<Select onValueChange={field.onChange} value={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue
											placeholder={
												filteredDepartureAirports.length > 0
													? "Select a airport"
													: "No airports"
											}
										/>
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{filteredDepartureAirports.map((airport) => (
										<SelectItem key={airport.id} value={airport.id}>
											{airport.name}, {airport.city}, {airport.country}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="arrivalAirportId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Arrival Airport</FormLabel>
							<Select onValueChange={field.onChange} value={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue
											placeholder={
												filteredArrivalAirports.length > 0
													? "Select a airport"
													: "No airports"
											}
										/>
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{filteredArrivalAirports.map((airport) => (
										<SelectItem key={airport.id} value={airport.id}>
											{airport.name}, {airport.city}, {airport.country}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="durationMinutes"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Duration (Mins)</FormLabel>
							<FormControl>
								<Input placeholder="50" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex space-x-4">
					{CloseDialog && (
						<CloseDialog asChild>
							<Button variant="outline">Cancel</Button>
						</CloseDialog>
					)}
					<Button
						disabled={
							form.formState.errors.root !== undefined ||
							form.formState.errors.departureAirportId !== undefined ||
							form.formState.errors.arrivalAirportId !== undefined ||
							form.formState.errors.durationMinutes !== undefined ||
							form.getValues("departureAirportId") === "" ||
							form.getValues("arrivalAirportId") === "" ||
							form.getValues("durationMinutes") <= 0
						}
						type="submit"
					>
						Submit
					</Button>
				</div>
			</form>
		</Form>
	);
}
