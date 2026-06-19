"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { addMinutes } from "date-fns";
import { useSearchParams } from "next/navigation";
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
import { createFlight } from "~/server/flights";
import type { AircraftData } from "~/validators/aircrafts";
import {
	type FlightCreateData,
	flightCreateDataValidator,
} from "~/validators/flights";
import type { RouteReadData } from "~/validators/routes";
import { DateTimePicker } from "../ui/date-time";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

interface FlightFormProps {
	aircrafts: AircraftData[];
	routes: RouteReadData[];
	CloseDialog?: typeof DialogClose;
}

export function FlightForm({
	aircrafts,
	routes,
	CloseDialog,
}: Readonly<FlightFormProps>) {
	const searchParams = useSearchParams();

	const form = useForm<FlightCreateData>({
		resolver: zodResolver(flightCreateDataValidator),
		defaultValues: {
			airlineId: searchParams.get("airlineId") ?? "",
			aircraftId: "",
			routeId: "",
			departure: new Date(),
			price: 0,
		},
	});

	async function onSubmit(data: FlightCreateData) {
		try {
			const response = await createFlight(data);

			if (response.status !== 201) {
				toast({
					title: "Error occurred",
					description: response.message,
					variant: "destructive",
				});
			}

			toast({
				title: response.message,
				description: (
					<pre className="mt-1 w-[340px] rounded-md p-1">
						<code>{JSON.stringify(response.data.flight, null, 2)}</code>
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

	const filteredRoutes = routes.filter((route) => {
		const [departureCity, departureCountry] = departure.split(", ");
		const [arrivalCity, arrivalCountry] = arrival.split(", ");

		return (
			(departureCity === undefined ||
				departureCity === "" ||
				route.departureCity.startsWith(departureCity)) &&
			(departureCountry === undefined ||
				departureCountry === "" ||
				route.departureCountry.startsWith(departureCountry)) &&
			(arrivalCity === undefined ||
				arrivalCity === "" ||
				route.arrivalCity.startsWith(arrivalCity)) &&
			(arrivalCountry === undefined ||
				arrivalCountry === "" ||
				route.arrivalCountry.startsWith(arrivalCountry))
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
					name="routeId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Route</FormLabel>
							<Select
								onValueChange={(value: string) => {
									field.onChange(value);

									const route = routes.find((route) => route.id === value);

									if (route) {
										form.setValue(
											"arrival",
											addMinutes(
												form.getValues("departure"),
												route.durationMinutes,
											),
										);
									}
								}}
								value={field.value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue
											placeholder={
												filteredRoutes.length > 0
													? "Select a route"
													: "No routes"
											}
										/>
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{filteredRoutes.map((route) => (
										<SelectItem key={route.id} value={route.id}>
											{route.departureAirport} to {route.arrivalAirport}
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
					name="departure"
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor="datetime">Departure</FormLabel>
							<FormControl>
								<DateTimePicker
									granularity="second"
									jsDate={field.value}
									onJsDateChange={(date: Date) => {
										field.onChange(date);

										form.setValue(
											"arrival",
											addMinutes(
												date,
												routes.find(
													(route) => route.id === form.getValues("routeId"),
												)?.durationMinutes ?? 0,
											),
										);
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="space-x-6 flex items-center">
					<FormField
						control={form.control}
						name="aircraftId"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel>Aircaft</FormLabel>
								<Select
									onValueChange={(value: string) => {
										field.onChange(value);

										const aircraft = aircrafts.find(
											(aircraft) => aircraft.id === value,
										);

										if (aircraft?.pilotId && aircraft?.crewMemberIds) {
											form.setValue("aircraftPilotId", aircraft.pilotId);

											form.setValue(
												"aircraftCrewIds",
												aircraft.crewMemberIds.split(", "),
											);
										}
									}}
									value={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue
												placeholder={
													aircrafts.length > 0
														? "Select an aircraft"
														: "No aircrafts"
												}
											/>
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{aircrafts.map((aircraft) => (
											<SelectItem key={aircraft.id} value={aircraft.id}>
												{aircraft.make} {aircraft.model}
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
						name="price"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel>Price</FormLabel>
								<FormControl>
									<Input type="number" placeholder="Price" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="flex space-x-4">
					{CloseDialog && (
						<CloseDialog asChild>
							<Button variant="outline">Cancel</Button>
						</CloseDialog>
					)}
					<Button
						disabled={
							form.formState.errors.root !== undefined ||
							form.formState.errors.routeId !== undefined ||
							form.formState.errors.departure !== undefined ||
							// form.formState.errors.arrival !== undefined ||
							form.formState.errors.aircraftId !== undefined ||
							form.formState.errors.price !== undefined ||
							form.getValues("routeId") === "" ||
							form.getValues("departure") === undefined ||
							// form.getValues("arrival") === undefined ||
							form.getValues("aircraftId") === undefined ||
							form.getValues("price") === undefined
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
