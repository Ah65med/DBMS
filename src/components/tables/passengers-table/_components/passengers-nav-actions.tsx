import { PlusIcon } from "lucide-react";
import { PassengerForm } from "~/components/forms/passenger-form";
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

export function PassengersNavActions() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="default">
					<PlusIcon className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>New Passenger</DialogTitle>
					<DialogDescription>
						Please fill out the form below to create a new passenger.
					</DialogDescription>
				</DialogHeader>
				<PassengerForm Close={DialogClose} />
			</DialogContent>
		</Dialog>
	);
}
