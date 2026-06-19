"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "~/components/common/data-table-column-header";
import type { CrewMemberReadData } from "~/validators/crew-members";
import { CrewMembersRowActions } from "./crew-members-row-actions";

export const crewMembersColumns: ColumnDef<CrewMemberReadData>[] = [
	{
		accessorKey: "id",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Crew Member" />
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
		accessorKey: "role",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Role" />
		),
		cell: ({ row }) => <div className="w-[128px]">{row.getValue("role")}</div>,
	},
	{
		id: "actions",
		cell: ({ row }) => <CrewMembersRowActions row={row} />,
	},
];
