"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "~/components/common/data-table-column-header";
import type { AirportReadData } from "~/validators/airports";
import { AirportsRowActions } from "./airports-row-actions";

export const airportsColumns: ColumnDef<AirportReadData>[] = [
	{
		accessorKey: "id",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Airport" />
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
		accessorKey: "city",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="City" />
		),
		cell: ({ row }) => <div className="w-[128px]">{row.getValue("city")}</div>,
	},
	{
		accessorKey: "country",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Country" />
		),
		cell: ({ row }) => (
			<div className="w-[128px]">{row.getValue("country")}</div>
		),
	},
	{
		id: "actions",
		cell: ({ row }) => <AirportsRowActions row={row} />,
	},
];
