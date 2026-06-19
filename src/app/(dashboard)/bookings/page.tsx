import type { Metadata } from "next";
import type { AwaitedReactNode } from "react";
import { TicketsTable } from "~/components/tables/tickets-table";
import { Card, CardContent } from "~/components/ui/card";

export const metadata: Metadata = {
	title: "Bookings",
};

interface BookingsPageProps {
	searchParams: {
		airlineId: string;
	};
}

export default async function BookingsPage({
	searchParams: { airlineId },
}: Readonly<BookingsPageProps>): Promise<AwaitedReactNode> {
	return (
		<section className="min-h-screen">
			<Card className="col-span-8 pt-4">
				<CardContent>
					<TicketsTable airlineId={airlineId} />
				</CardContent>
			</Card>
		</section>
	);
}
