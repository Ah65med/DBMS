"use client";

import { CaretSortIcon, ExitIcon } from "@radix-ui/react-icons";
import { CogIcon, UserIcon } from "lucide-react";
import { useRouter} from "next/navigation";
import { useState } from "react";

import { Avatar } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "~/components/ui/command";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "~/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";

import { cn } from "~/lib/utils";


type PopoverTriggerProps = React.ComponentPropsWithoutRef<
	typeof PopoverTrigger
>;

interface TeamSwitcherProps extends PopoverTriggerProps {}

export function AirlineProfile({ className }: TeamSwitcherProps) {
	const [open, setOpen] = useState(false);
	const [showSettingsDialog, setShowSettingsDialog] = useState(false);
	const router = useRouter()

	return (
		<Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						aria-label="Select a team"
						className={cn("w-[200px] justify-between", className)}
					>
						<Avatar className="mr-2 h-5 w-5">
							<UserIcon className="h-5 w-5" />
						</Avatar>
						Options
						<CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] p-0">
					<Command>
						<CommandList>
							<CommandInput placeholder="Search actions..." />
							<CommandEmpty>No action found.</CommandEmpty>
							<CommandGroup heading={"Account"}>
								<DialogTrigger asChild>
									<CommandItem
										// onSelect={() => {
										// 	setOpen(false);
										// 	setShowSettingsDialog(true);
										// }}
									>
										<CogIcon className="mr-2 h-5 w-5" />
										Settings
									</CommandItem>
								</DialogTrigger>
								<DialogTrigger asChild>
									<CommandItem
										onSelect={() => {
											router.push("/auth")
										}}
									>
										<ExitIcon className="mr-2 h-5 w-5" />
										Logout
									</CommandItem>
								</DialogTrigger>
							</CommandGroup>
						</CommandList>
						<CommandSeparator />
						<CommandList />
					</Command>
				</PopoverContent>
			</Popover>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create team</DialogTitle>
					<DialogDescription>
						Add a new team to manage products and customers.
					</DialogDescription>
				</DialogHeader>
				<div>
					<div className="space-y-4 py-2 pb-4">
						<div className="space-y-2">
							<Label htmlFor="name">Team name</Label>
							<Input id="name" placeholder="Acme Inc." />
						</div>
						<div className="space-y-2">
							<Label htmlFor="plan">Subscription plan</Label>
							<Select>
								<SelectTrigger>
									<SelectValue placeholder="Select a plan" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="free">
										<span className="font-medium">Free</span> -{" "}
										<span className="text-muted-foreground">
											Trial for two weeks
										</span>
									</SelectItem>
									<SelectItem value="pro">
										<span className="font-medium">Pro</span> -{" "}
										<span className="text-muted-foreground">
											$9/month per user
										</span>
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>
				<DialogFooter>
					<Button
						variant="outline"
						onClick={() => setShowSettingsDialog(false)}
					>
						Cancel
					</Button>
					<Button type="submit">Continue</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
