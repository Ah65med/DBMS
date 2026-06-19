"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "~/components/common/data-table-column-header";
import type { TicketReadData } from "~/validators/tickets";
import { TicketsRowActions } from "./tickets-row-actions";

export const ticketsColumns: ColumnDef<TicketReadData>[] = [
	{
		accessorKey: "ticket",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Ticket" />
		),
		cell: ({ row }) => <div className="w-[128px]">{row.original.id}</div>,
	},
	{
		accessorKey: "name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Name" />
		),
		cell: ({ row }) => (
			<div className="w-[128px]">{row.original.passengerName}</div>
		),
	},
	{
		accessorKey: "phone",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Phone" />
		),
		cell: ({ row }) => (
			<div className="w-[128px]">{row.original.passengerPhone}</div>
		),
	},
	{
		accessorKey: "flightTimings",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Flight Timings" />
		),
		cell: ({ row }) => {
			console.log(row.original.departureTime);

			return (
				<>
					<div className="w-[128px]">
						{row.original.departureTime.toLocaleString()}
					</div>
					<br />
					<div className="w-[128px]">
						{row.original.arrivalTime.toLocaleString()}
					</div>
				</>
			);
		},
	},
	{
		accessorKey: "departureLocation",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Departure" />
		),
		cell: ({ row }) => (
			<>
				<div className="w-[128px]">{row.original.departureAirport}</div>
				<br />
				<div>
					{row.original.departureCity}, {row.original.departureCountry}
				</div>
			</>
		),
	},
	{
		accessorKey: "arrivalLocation",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Arrival" />
		),
		cell: ({ row }) => (
			<>
				<div className="w-[128px]">{row.original.arrivalAirport}</div>
				<br />
				<div>
					{row.original.arrivalCity}, {row.original.arrivalCountry}
				</div>
			</>
		),
	},
	{
		accessorKey: "price",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Price" />
		),
		cell: ({ row }) => <div className="w-[128px]">${row.original.price}</div>,
	},
	{
		id: "actions",
		cell: ({ row }) => <TicketsRowActions row={row} />,
	},
];
