import { DataTable } from "~/components/common/data-table";
import { getTickets } from "~/server/tickets";
import { ticketsColumns } from "./_components/tickets-columns";
import { TicketsNavActions } from "./_components/tickets-nav-actions";

interface TicketsTableProps {
	airlineId: string;
}

export async function TicketsTable({ airlineId }: Readonly<TicketsTableProps>) {
	const ticketsResponse = await getTickets(airlineId);

	return (
		<article className="h-full space-y-8">
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Tickets</h2>
				<TicketsNavActions airlineId={airlineId} />
			</div>
			<DataTable columns={ticketsColumns} data={ticketsResponse.data.tickets} />
		</article>
	);
}
