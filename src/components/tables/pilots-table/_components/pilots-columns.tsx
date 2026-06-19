"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "~/components/common/data-table-column-header";
import type { PilotCreateData } from "~/validators/pilots";
import { PilotsRowAction } from "./pilots-row-actions";

export const pilotColumns: ColumnDef<PilotCreateData>[] = [
	{
		accessorKey: "id",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Pilot" />
		),
		cell: ({ row }) => <div className="w-[128px]">{row.getValue("id")}</div>,
	},
	{
		accessorKey: "name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Name" />
		),
		cell: ({ row }) => <div className="w-[128px]">{row.getValue("name")}</div>,
	},
	{
		accessorKey: "aircraftId",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Aircraft" />
		),
		cell: ({ row }) => (
			<div className="w-[128px]">
				{row.getValue("aircraftId") || "Not Assigned"}
			</div>
		),
	},
	{
		id: "actions",
		cell: ({ row }) => <PilotsRowAction row={row} />,
	},
];
