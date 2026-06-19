"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
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
import { createPilot } from "~/server/pilots";
import type { AircraftData } from "~/validators/aircrafts";
import { type PilotInput, pilotsInputValidator } from "~/validators/pilots";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

interface PilotFormProps {
	aircrafts: AircraftData[];
	CloseDialog?: typeof DialogClose;
}

export function PilotForm({
	aircrafts,
	CloseDialog,
}: Readonly<PilotFormProps>) {
	const searchParams = useSearchParams();

	const form = useForm<PilotInput>({
		resolver: zodResolver(pilotsInputValidator),
		defaultValues: {
			airlineId: searchParams.get("airlineId") ?? "",
			aircraftId: null,
			name: "",
		},
	});

	async function onSubmit(data: PilotInput) {
		try {
			const response = await createPilot(data);

			toast({
				title: response.message,
				description: (
					<pre className="mt-1 w-[340px] rounded-md p-1">
						<code>{JSON.stringify(response.data.pilot, null, 2)}</code>
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

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Full Name</FormLabel>
							<FormControl>
								<Input placeholder="John Doe" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="aircraftId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Aircaft</FormLabel>
							<Select
								onValueChange={field.onChange}
								value={field.value || undefined}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue
											placeholder={
												aircrafts.length === 0
													? "No aircrafts"
													: "Select an Aircraft	"
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
				<div className="flex space-x-4">
					{CloseDialog && (
						<CloseDialog asChild>
							<Button variant="outline">Cancel</Button>
						</CloseDialog>
					)}
					<Button
						disabled={
							form.formState.errors.root !== undefined ||
							form.formState.errors.airlineId !== undefined ||
							form.formState.errors.aircraftId !== undefined ||
							form.formState.errors.name !== undefined ||
							form.getValues("airlineId") === "" ||
							form.getValues("aircraftId") === "" ||
							form.getValues("name") === ""
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
