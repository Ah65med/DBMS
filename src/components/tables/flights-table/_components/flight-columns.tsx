"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { fromUnixTime } from "date-fns";
import { DataTableColumnHeader } from "~/components/common/data-table-column-header";
import type { FlightReadData } from "~/validators/flights";
import { FlightsRowActions } from "./flight-row-actions";

export const flightColumns: ColumnDef<FlightReadData>[] = [
	{
		accessorKey: "flight",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Flight" />
		),
		cell: ({ row }) => {
			return (
				<div className="w-[128px]">
					<span>{row.original.id}</span>
				</div>
			);
		},
	},
	{
		accessorKey: "aircraft",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Aircraft" />
		),
		cell: ({ row }) => (
			<div className="w-[128px]">
				{row.original.aircraftMake}, {row.original.aircraftModel}
			</div>
		),
	},
	{
		accessorKey: "route",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Route" />
		),
		cell: ({ row }) => (
			<>
				<div>
					{row.original.departureCity}, {row.original.departureCountry}
				</div>
				<div>
					{row.original.arrivalCity}, {row.original.arrivalCountry}
				</div>
			</>
		),
	},

	{
		accessorKey: "departureTime",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Departure Time" />
		),
		cell: ({ row }) => (
			<>
				<div>{row.original.departureAirport}</div>
				<br />
				<div className="w-[84px]" suppressHydrationWarning>
					{fromUnixTime(row.getValue("departureTime")).toLocaleString()}
				</div>
			</>
		),
	},
	{
		accessorKey: "arrivalTime",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Arrival Time" />
		),
		cell: ({ row }) => (
			<>
				<div>{row.original.arrivalAirport}</div>
				<br />
				<div className="w-[84px]" suppressHydrationWarning>
					{fromUnixTime(row.getValue("arrivalTime")).toLocaleString()}
				</div>
			</>
		),
	},
	{
		accessorKey: "passengerCount",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Passengers" />
		),
		cell: ({ row }) => (
			<div className="w-[128px]">{row.original.passengerCount}</div>
		),
	},
	{
		accessorKey: "status",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Status" />
		),
		cell: ({ row }) => <div className="w-[128px]">{row.original.status}</div>,
	},
	{
		accessorKey: "price",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Price" />
		),
		cell: ({ row }) => <div className="w-[128px]">${row.original.price}</div>,
	},
	{
		accessorKey: "capacity",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Capacity" />
		),
		cell: ({ row }) => <div className="w-[128px]">{row.original.capacity}</div>,
	},
	{
		accessorKey: "passengerCount",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Passengers" />
		),
		cell: ({ row }) => (
			<div className="w-[128px]">{row.original.passengerCount}</div>
		),
	},
	{
		id: "actions",
		cell: ({ row }) => <FlightsRowActions row={row} />,
	},
];
