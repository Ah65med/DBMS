import type { PropsWithChildren } from "react";
import { ThemeMenuButon } from "~/components/common/theme-menu-button";
import { cn } from "~/lib/utils";
import { MainNav } from "./_components/main-nav";
import { AirlineProfile } from "./_components/team-switcher";

export default function DashboardLayout({
	children,
}: Readonly<PropsWithChildren>) {
	return (
		<div className="flex flex-col">
			<div className="border-b">
				<div className="flex h-16 items-center px-4">
					<AirlineProfile />
					<div className="ml-auto flex items-center space-x-4">
						<MainNav className="mx-6" />
						<ThemeMenuButon
							className={cn("rounded-full")}
							variant="ghost"
							size="icon"
						/>
					</div>
				</div>
			</div>
			<main className="flex-1 space-y-4 p-4 pt-6">{children}</main>
			<footer />
		</div>
	);
}
