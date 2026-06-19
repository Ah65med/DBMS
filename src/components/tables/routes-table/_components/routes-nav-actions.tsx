import { PlusIcon } from "lucide-react";
import { RouteForm } from "~/components/forms/route-form";
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
import { getAirports } from "~/server/airports";

interface RoutesNavActionsProps {
	airlineId: string;
}

export async function RoutesNavActions({
	airlineId,
}: Readonly<RoutesNavActionsProps>) {
	const airportsResponse = await getAirports(airlineId);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="default">
					<PlusIcon className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>New Route</DialogTitle>
					<DialogDescription>
						Please fill out the form below to create a new route.
					</DialogDescription>
				</DialogHeader>
				<RouteForm
					airports={airportsResponse.data.airports}
					CloseDialog={DialogClose}
				/>
			</DialogContent>
		</Dialog>
	);
}
