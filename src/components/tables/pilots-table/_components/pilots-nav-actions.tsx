import { PlusIcon } from "lucide-react";
import { PilotForm } from "~/components/forms/pilot-form";
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
import { getAircraftsWithoutPilot } from "~/server/aircrafts";

interface PilotsNavActionsProps {
	airlineId: string;
}

export async function PilotsNavActions({
	airlineId,
}: Readonly<PilotsNavActionsProps>) {
	const aircraftsResponse = await getAircraftsWithoutPilot(airlineId);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="default">
					<PlusIcon className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>New Pilot</DialogTitle>
					<DialogDescription>
						Please fill out the form below to create a new pilot.
					</DialogDescription>
				</DialogHeader>
				<PilotForm
					aircrafts={aircraftsResponse.data.aircrafts}
					CloseDialog={DialogClose}
				/>
			</DialogContent>
		</Dialog>
	);
}
