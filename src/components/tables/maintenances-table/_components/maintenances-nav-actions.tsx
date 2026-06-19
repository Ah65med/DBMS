import { PlusIcon } from "lucide-react";
import MaintenanceForm from "~/components/forms/maintenance-form";
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

export async function MaintenancesNavActions() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="default">
					<PlusIcon className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>New Maintenance</DialogTitle>
					<DialogDescription>
						Please fill out the form below to create a new maintenance.
					</DialogDescription>
				</DialogHeader>
				<MaintenanceForm CloseDialog={DialogClose} />
			</DialogContent>
		</Dialog>
	);
}
