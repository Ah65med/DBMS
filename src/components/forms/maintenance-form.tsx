"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { default as zod } from "zod";
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
import { createMaintenance } from "~/server/maintenances";
import {
	type MaintenanceCreateData,
	maintenanceCreateDataValidator,
} from "~/validators/maintenances";
import { DateTimePicker } from "../ui/date-time";

interface MaintenanceFormProps {
	CloseDialog: typeof DialogClose;
}

export default function MaintenanceForm({ CloseDialog }: MaintenanceFormProps) {
	const searchParams = useSearchParams();

	const form = useForm<MaintenanceCreateData>({
		resolver: zodResolver(maintenanceCreateDataValidator),
		defaultValues: {
			airlineId: searchParams.get("airlineId") ?? "",
			aircraftId: "",
			description: "",
			startDate: new Date(),
		},
	});

	async function onSubmit(data: MaintenanceCreateData) {
		try {
			const response = await createMaintenance(data);

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
						<code>{JSON.stringify(response.data.maintenance, null, 2)}</code>
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
					name="aircraftId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Aircraft ID</FormLabel>
							<FormControl>
								<Input placeholder="AA-21" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Input
									placeholder="e.g. location detector changed..."
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="startDate"
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor="datetime">Start Date</FormLabel>
							<FormControl>
								<DateTimePicker
									granularity="second"
									jsDate={field.value}
									onJsDateChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
