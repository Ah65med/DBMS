"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
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
import { createQueryString } from "~/lib/utils";
import { signInAirline } from "~/server/airlines";
import {
	type AirlineSignInData,
	airlineSignInDataValidator,
} from "~/validators/airlines";

export function AirlineSignInForm() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const form = useForm<AirlineSignInData>({
		resolver: zodResolver(airlineSignInDataValidator),
		defaultValues: {
			email: "email@domain.com",
			password: "12345678",
		},
	});

	async function onSubmit(data: AirlineSignInData) {
		try {
			const response = await signInAirline(data.email, data.password);

			if (!response.data.airline) {
				throw new Error("Invalid email or password. Please try again.");
			}

			toast({
				title: response.message,
				description: (
					<pre className="mt-1 w-[340px] rounded-md p-1">
						<code>{JSON.stringify(response.data.airline, null, 2)}</code>
					</pre>
				),
				variant: "default",
			});

			router.push(
				`/overview?${createQueryString(searchParams, "airlineId", response.data.airline.id)}`,
			);
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
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="email@domain.com" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input placeholder="********" {...field} />
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
