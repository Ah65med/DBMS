"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
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
import { createIncident } from "~/server/incidents";
import {
	type IncidentCreateData,
	incidentCreateDataValidator,
} from "~/validators/incidents";
import { DateTimePicker } from "../ui/date-time";
import type { DialogClose } from "../ui/dialog";

interface IncidentFormProps {
	CloseDialog: typeof DialogClose;
}

export function IncidentForm({ CloseDialog }: Readonly<IncidentFormProps>) {
	const searchParams = useSearchParams();

	const form = useForm<IncidentCreateData>({
		resolver: zodResolver(incidentCreateDataValidator),
		defaultValues: {
			airlineId: searchParams.get("airlineId") ?? "",
			flightId: "",
			description: "",
			date: new Date(),
		},
	});

	async function onSubmit(data: IncidentCreateData) {
		try {
			const response = await createIncident(data);

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
						<code>{JSON.stringify(response.data.incident, null, 2)}</code>
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
					name="flightId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Flight ID</FormLabel>
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
									placeholder="e.g. On 9 september, plane crashed due to..."
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="date"
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor="datetime">Date</FormLabel>
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
