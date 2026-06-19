import { DataTable } from "~/components/common/data-table";
import { getFlights } from "~/server/flights";
import { flightColumns } from "./_components/flight-columns";
import { FlightNavActions } from "./_components/flight-nav-actions";

interface FlightsTableProps {
	airlineId: string;
}

export async function FlightsTable({ airlineId }: Readonly<FlightsTableProps>) {
	const flightsResponse = await getFlights(airlineId);

	return (
		<article className="hidden h-full flex-1 flex-col space-y-8 md:flex">
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Flights</h2>
				<FlightNavActions airlineId={airlineId} />
			</div>
			<DataTable columns={flightColumns} data={flightsResponse.data.flights} />
		</article>
	);
}
