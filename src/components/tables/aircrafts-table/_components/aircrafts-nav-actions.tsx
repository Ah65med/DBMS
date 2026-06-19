import { PlusIcon } from "lucide-react";
import { AircraftForm } from "~/components/forms/aircraft-form";
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
import { getAvailableCrewMembers } from "~/server/crew-members";
import { getAvailablePilots } from "~/server/pilots";

interface AircraftsNavActionsProps {
	airlineId: string;
}

export async function AircraftsNavActions({
	airlineId,
}: Readonly<AircraftsNavActionsProps>) {
	const pilotsResponse = await getAvailablePilots(airlineId);
	const crewMembersResponse = await getAvailableCrewMembers(airlineId);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="default">
					<PlusIcon className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>New Aircraft</DialogTitle>
					<DialogDescription>
						Please fill out the form below to create a new aircraft.
					</DialogDescription>
				</DialogHeader>
				<AircraftForm
					airlineId={airlineId}
					pilots={pilotsResponse.data.pilots}
					crewMembers={crewMembersResponse.data.crewMembers}
					CloseDialog={DialogClose}
				/>
			</DialogContent>
		</Dialog>
	);
}
