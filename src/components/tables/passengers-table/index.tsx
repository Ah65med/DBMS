import { DataTable } from "~/components/common/data-table";
import { getPassengers } from "~/server/passengers";
import { passengerColumns } from "./_components/passengers-columns";
import { PassengersNavActions } from "./_components/passengers-nav-actions";

interface PassengersTableProps {
	airlineId: string;
}

export async function PassengersTable({
	airlineId,
}: Readonly<PassengersTableProps>) {
	const response = await getPassengers(airlineId);

	return (
		<article className="h-full space-y-8">
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Passengers</h2>
				<PassengersNavActions />
			</div>
			<DataTable columns={passengerColumns} data={response.data.passengers} />
		</article>
	);
}
