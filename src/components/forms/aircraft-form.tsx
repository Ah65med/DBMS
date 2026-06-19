"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { createAircraft } from "~/server/aircrafts";
import {
	type AircraftInput,
	aircraftInputValidator,
} from "~/validators/aircrafts";
import type { CrewMemberReadData } from "~/validators/crew-members";
import type { PilotCreateData } from "~/validators/pilots";
import MultipleSelector, { type Option } from "../ui/multi-select";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

interface AircraftFormProps {
	airlineId: string;
	pilots: PilotCreateData[];
	crewMembers: CrewMemberReadData[];
	CloseDialog?: typeof DialogClose;
}

export function AircraftForm({
	airlineId,
	pilots,
	crewMembers,
	CloseDialog,
}: Readonly<AircraftFormProps>) {
	const form = useForm<AircraftInput>({
		resolver: zodResolver(aircraftInputValidator),
		defaultValues: {
			airlineId,
			make: "",
			model: "",
			capacity: 0,
			pilotId: "",
			crewMemberIds: [],
		},
	});

	async function onSubmit(data: AircraftInput) {
		try {
			const response = await createAircraft(data);

			toast({
				title: response.message,
				description: (
					<pre className="mt-1 w-[340px] rounded-md p-1">
						<code>{JSON.stringify(response.data.aircraft, null, 2)}</code>
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
			form.resetField("capacity");
		}
	}

	const crewMembersOptions: Option[] = crewMembers.map((crewMember) => ({
		label: crewMember.name,
		value: crewMember.id,
	}));

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<div className="flex space-x-4">
					<FormField
						control={form.control}
						name="make"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Make</FormLabel>
								<FormControl>
									<Input placeholder="Samsung" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="model"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Model</FormLabel>
								<FormControl>
									<Input placeholder="S17" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="flex space-x-4">
					<FormField
						control={form.control}
						name="capacity"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel>Capacity</FormLabel>
								<FormControl>
									<Input placeholder="120" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="pilotId"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel>Pilot</FormLabel>
								<Select onValueChange={field.onChange} value={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue
												placeholder={
													pilots.length === 0 ? "No pilots" : "Select a pilot	"
												}
											/>
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{pilots.map((pilot) => (
											<SelectItem key={pilot.id} value={pilot.id}>
												{pilot.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name="crewMemberIds"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Crew Members</FormLabel>
							<FormControl>
								<MultipleSelector
									{...field}
									defaultOptions={crewMembersOptions}
									placeholder={
										crewMembers.length === 0
											? "No crew members"
											: "Select crew members"
									}
									emptyIndicator={
										<p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
											no results found.
										</p>
									}
								/>
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
							form.formState.errors.airlineId !== undefined ||
							form.formState.errors.capacity !== undefined ||
							form.formState.errors.crewMemberIds !== undefined ||
							form.formState.errors.make !== undefined ||
							form.formState.errors.model !== undefined ||
							form.formState.errors.pilotId !== undefined ||
							form.formState.errors.crewMemberIds !== undefined ||
							form.formState.errors.root !== undefined ||
							form.getValues("airlineId") === "" ||
							form.getValues("capacity") === 0 ||
							form.getValues("crewMemberIds")?.length === 0 ||
							form.getValues("make") === "" ||
							form.getValues("model") === "" ||
							form.getValues("pilotId") === "" ||
							form.getValues("crewMemberIds").length === 0
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
