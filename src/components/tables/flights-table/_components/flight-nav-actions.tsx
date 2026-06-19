import { PlusIcon } from "lucide-react";
import { FlightForm } from "~/components/forms/flight-form";
import { Button } from "~/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";
import { getAircraftsWithPilotAndCrewMember } from "~/server/aircrafts";
import { getRoutes } from "~/server/routes";

interface FlightNavActionsProps {
	airlineId: string;
}

export async function FlightNavActions({
	airlineId,
}: Readonly<FlightNavActionsProps>) {
	const routesResponse = await getRoutes(airlineId);
	const aircraftsResponse = await getAircraftsWithPilotAndCrewMember(airlineId);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="default">
					<PlusIcon className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>New FLight</DialogTitle>
					<DialogDescription>
						Please fill out the form below to create a new flight.
					</DialogDescription>
				</DialogHeader>
				<FlightForm
					routes={routesResponse.data.routes}
					aircrafts={aircraftsResponse.data.aircrafts}
					CloseDialog={DialogClose}
				/>
			</DialogContent>
		</Dialog>
	);
}
