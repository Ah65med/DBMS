import type { Metadata } from "next";
import type { AwaitedReactNode } from "react";
import { IncidentsTable } from "~/components/tables/incidents-table";
import { MaintenancesTable } from "~/components/tables/maintenances-table";
import { Card, CardContent } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export const metadata: Metadata = {
	title: "Records",
};

interface RecordsPageProps {
	searchParams: { airlineId: string };
}

export default async function RecordsPage({
	searchParams: { airlineId },
}: Readonly<RecordsPageProps>): Promise<AwaitedReactNode> {
	return (
		<section className="min-h-screen">
			<Tabs defaultValue="maintenance">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="maintenance">Maintenance Records</TabsTrigger>
					<TabsTrigger value="incident">Incident Records</TabsTrigger>
				</TabsList>
				<TabsContent value="maintenance">
					<Card>
						<CardContent>
							<MaintenancesTable airlineId={airlineId} />
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="incident">
					<Card>
						<CardContent>
							<IncidentsTable airlineId={airlineId} />
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</section>
	);
}
