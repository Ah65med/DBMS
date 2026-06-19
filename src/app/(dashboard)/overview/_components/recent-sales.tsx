import { fromUnixTime } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export function RecentBookings({
	data,
}: {
	data: {
		name: string;
		phone: string;
		date: Date;
	}[];
}) {
	return (
		<div className="space-y-8">
			{data.map((item) => (
				<div key={item.date.toLocaleString()} className="flex items-center">
					<Avatar className="h-9 w-9">
						<AvatarFallback>
							{item.name.split(" ")[0].charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div className="ml-4 space-y-1">
						<p className="text-sm font-medium leading-none">{item.name}</p>
						<p className="text-sm text-muted-foreground">{item.phone}</p>
					</div>
					<div className="ml-auto font-medium">
						{item.date.toLocaleString()}
					</div>
				</div>
			))}
		</div>
	);
}
