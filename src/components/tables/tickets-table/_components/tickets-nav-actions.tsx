import { PlusIcon } from "lucide-react";
import { TicketForm } from "~/components/forms/ticket-form";
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
import { getAvailableFlightsOfAirline, getFlights } from "~/server/flights";
import { getPassengers } from "~/server/passengers";

interface TicketsNavActionsProps {
	airlineId: string;
}

export async function TicketsNavActions({
	airlineId,
}: Readonly<TicketsNavActionsProps>) {
	const passengersResponse = await getPassengers(airlineId);
	const flightsResponse = await getAvailableFlightsOfAirline(airlineId);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="default">
					<PlusIcon className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>New Ticket</DialogTitle>
					<DialogDescription>
						Please fill out the form below to create a new ticket.
					</DialogDescription>
				</DialogHeader>
				<TicketForm
					airlineId={airlineId}
					passengers={passengersResponse.data.passengers}
					flights={flightsResponse.data.flights}
					CloseDialog={DialogClose}
				/>
			</DialogContent>
		</Dialog>
	);
}
