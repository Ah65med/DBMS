"use client";

import { default as Link } from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { HTMLAttributes } from "react";
import { cn } from "~/lib/utils";

const routes = [
	{
		label: "Overview",
		href: "/overview",
	},
	{
		label: "Flights",
		href: "/flights",
	},
	{
		label: "Bookings",
		href: "/bookings",
	},
	{
		label: "Management",
		href: "/management",
	},
	{
		label: "Records",
		href: "/records",
	},
];

export function MainNav({ className, ...props }: HTMLAttributes<HTMLElement>) {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const airlineId = searchParams.get("airlineId");

	return (
		<nav
			className={cn("flex items-center space-x-4 lg:space-x-6", className)}
			{...props}
		>
			{routes.map((route) => (
				<Link
					key={route.href}
					href={route.href + (airlineId ? `?airlineId=${airlineId}` : "")}
					className={cn("text-sm font-medium transition-colors", {
						"text-muted-foreground": pathname !== route.href,
					})}
				>
					{route.label}
				</Link>
			))}
		</nav>
	);
}
