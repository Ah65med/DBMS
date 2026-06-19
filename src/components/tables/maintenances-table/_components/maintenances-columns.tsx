"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "~/components/common/data-table-column-header";
import type { MaintenanceReadData } from "~/validators/maintenances";
import { MaintenancesRowActions } from "./maintenances-row-actions";

export const maintenancesColumns: ColumnDef<MaintenanceReadData>[] = [
	{
		accessorKey: "id",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Id" />
		),
		cell: ({ row }) => <div className="w-[128px]">{row.getValue("id")}</div>,
	},
	{
		accessorKey: "aircraftId",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Aircraft" />
		),
		cell: ({ row }) => (
			<div className="w-[128px]">{row.getValue("aircraftId")}</div>
		),
	},
	{
		accessorKey: "description",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Description" />
		),
		cell: ({ row }) => (
			<div className="w-[128px]">{row.getValue("description")}</div>
		),
		enableSorting: false,
	},
	{
		accessorKey: "status",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Status" />
		),
		cell: ({ row }) => (
			<div className="w-[128px]">{row.getValue("status")}</div>
		),
		enableSorting: false,
	},
	{
		accessorKey: "startDate",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Start Date" />
		),
		cell: ({ row }) => (
			<div className="w-[128px]">{row.original.startDate.toLocaleString()}</div>
		),
	},
	{
		accessorKey: "endDate",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="End Date" />
		),
		cell: ({ row }) => (
			<div className="w-[128px]">{row.original.endDate?.toLocaleString()}</div>
		),
	},
	{
		id: "actions",
		cell: ({ row }) => <MaintenancesRowActions row={row} />,
	},
];
