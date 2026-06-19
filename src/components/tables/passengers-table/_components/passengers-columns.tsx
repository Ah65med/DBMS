"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { fromUnixTime } from "date-fns";
import { DataTableColumnHeader } from "~/components/common/data-table-column-header";
import type { PassengerReadData } from "~/validators/passengers";
import { PassengerRowActions } from "./passengers-row-actions";

export const passengerColumns: ColumnDef<PassengerReadData>[] = [
	{
		accessorKey: "id",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Passenger" />
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
		accessorKey: "phone",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Phone" />
		),
		cell: ({ row }) => <div className="w-[128px]">{row.getValue("phone")}</div>,
	},
	{
		accessorKey: "registerationDate",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Date" />
		),
		cell: ({ row }) => (
			<div className="w-[80px]" suppressHydrationWarning>
				{fromUnixTime(row.getValue("registerationDate")).toLocaleDateString()}
			</div>
		),
	},
	{
		id: "actions",
		cell: ({ row }) => <PassengerRowActions row={row} />,
	},
];
