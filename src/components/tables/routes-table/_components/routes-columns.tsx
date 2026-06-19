"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "~/components/common/data-table-column-header";
import type { RouteReadData } from "~/validators/routes";
import { RoutesRowActions } from "./routes-row-actions";

export const routesColumns: ColumnDef<RouteReadData>[] = [
	{
		accessorKey: "id",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Route" />
		),
		cell: ({ row }) => <div className="w-[128px]">{row.getValue("id")}</div>,
	},
	{
		accessorKey: "departure",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Departure" />
		),
		cell: ({ row }) => (
			<>
				<div className="w-[128px]">{row.original.departureAirport}</div>
				<div className="w-[128px]">
					{row.original.departureCity}, {row.original.departureCountry}
				</div>
			</>
		),
	},
	{
		accessorKey: "arrival",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Arrival" />
		),
		cell: ({ row }) => (
			<>
				<div className="w-[128px]">{row.original.arrivalAirport}</div>
				<div className="w-[128px]">
					{row.original.arrivalCity}, {row.original.arrivalCountry}
				</div>
			</>
		),
	},
	{
		accessorKey: "durationMinutes",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Duration (Mins)" />
		),
		cell: ({ row }) => (
			<div className="w-[128px]">{row.original.durationMinutes}</div>
		),
	},
	{
		id: "actions",
		cell: ({ row }) => <RoutesRowActions row={row} />,
	},
];
