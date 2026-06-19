import type { Metadata } from "next";
import type { AwaitedReactNode } from "react";
import { FlightsTable } from "~/components/tables/flights-table";
import { Card, CardContent } from "~/components/ui/card";
import { getAircrafts } from "~/server/aircrafts";
import { getFlights } from "~/server/flights";
import { getRoutes } from "~/server/routes";

export const metadata: Metadata = {
	title: "Flights",
};

interface FlightPageProps {
	searchParams: { airlineId: string };
}

export default async function FlightsPage({
	searchParams: { airlineId },
}: Readonly<FlightPageProps>): Promise<AwaitedReactNode> {
	return (
		<section className="min-h-screen">
			<Card className="col-span-8 pt-4">
				<CardContent>
					<FlightsTable airlineId={airlineId} />
				</CardContent>
			</Card>
		</section>
	);
}
