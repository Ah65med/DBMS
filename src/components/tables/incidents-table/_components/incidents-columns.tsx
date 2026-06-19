"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "~/components/common/data-table-column-header";
import type { IncidentReadData } from "~/validators/incidents";
import { IncidentsRowActions } from "./incidents-row-actions";

export const incidentsColumns: ColumnDef<IncidentReadData>[] = [
	{
		accessorKey: "id",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Incident" />
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
		accessorKey: "flightId",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Flight" />
		),
		cell: ({ row }) => <div className="w-[128px]">{row.original.flightId}</div>,
	},
	{
		accessorKey: "description",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Description" />
		),
		cell: ({ row }) => <div>{row.original.description}</div>,
	},
	{
		accessorKey: "date",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Date" />
		),
		cell: ({ row }) => (
			<div className="w-[128px]">{row.original.date.toLocaleString()}</div>
		),
	},
	{
		id: "actions",
		cell: ({ row }) => <IncidentsRowActions row={row} />,
	},
];
