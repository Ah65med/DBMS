import {
	ActivitySquareIcon,
	CalendarCheckIcon,
	CreditCardIcon,
	UsersIcon,
} from "lucide-react";
import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { getOverviewData } from "~/server/overview";
import { PassengerTraffic } from "./_components/overview";
import { RecentBookings } from "./_components/recent-sales";

export const metadata: Metadata = {
	title: "Overview",
};

export default async function OverviewPage() {
	const parsedResponse = await getOverviewData();

	return (
		<>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Active Flights
						</CardTitle>
						<ActivitySquareIcon size={18} className="text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{parsedResponse.data.numberOfActiveFlights}
						</div>
						<p className="text-xs text-muted-foreground" />
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Sheduled Flights
						</CardTitle>
						<CalendarCheckIcon size={18} className="text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{parsedResponse.data.numberOfScheduledFlights}
						</div>
						<p className="text-xs text-muted-foreground" />
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Bookings
						</CardTitle>
						<CreditCardIcon size={18} className="text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{parsedResponse.data.numberOfTicketsSold}
						</div>
						<p className="text-xs text-muted-foreground" />
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Passengers
						</CardTitle>
						<UsersIcon size={18} className="text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{parsedResponse.data.numberOfPassengers}
						</div>
						<p className="text-xs text-muted-foreground" />
					</CardContent>
				</Card>
			</div>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
				<Card className="col-span-4">
					<CardHeader>
						<CardTitle>Passenger Traffic</CardTitle>
					</CardHeader>
					<CardContent className="pl-2">
						<PassengerTraffic
							data={parsedResponse.data.passengerTraficData || []}
						/>
					</CardContent>
				</Card>
				<Card className="col-span-3">
					<CardHeader>
						<CardTitle>Recent Bookings</CardTitle>
					</CardHeader>
					<CardContent>
						<RecentBookings
							data={parsedResponse.data.recentBookingsData || []}
						/>
					</CardContent>
				</Card>
			</div>
		</>
	);
}
