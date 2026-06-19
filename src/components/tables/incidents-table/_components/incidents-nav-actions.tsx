import { PlusIcon } from "lucide-react";
import { IncidentForm } from "~/components/forms/incident-form";
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

export async function IncidentsNavActions() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="default">
					<PlusIcon className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>New Incident</DialogTitle>
					<DialogDescription>
						Please fill out the form below to create a new incident.
					</DialogDescription>
				</DialogHeader>
				<IncidentForm CloseDialog={DialogClose} />
			</DialogContent>
		</Dialog>
	);
}
