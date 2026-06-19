"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Fragment } from "react";
import { DataTableColumnHeader } from "~/components/common/data-table-column-header";
import type { AircraftData } from "~/validators/aircrafts";
import { AircraftsRowActions } from "./aircrafts-row-actions";

export const aircraftsColumns: ColumnDef<AircraftData>[] = [
	{
		accessorKey: "id",
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
		accessorKey: "make",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Make" />
		),
		cell: ({ row }) => <div className="w-[128px]">{row.original.make}</div>,
	},
	{
		accessorKey: "model",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Model" />
		),
		cell: ({ row }) => <div className="w-[128px]">{row.original.model}</div>,
	},
	{
		accessorKey: "status",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Status" />
		),
		cell: ({ row }) => <div className="w-[128px]">{row.original.status}</div>,
	},
	{
		accessorKey: "capacity",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Capacity" />
		),
		cell: ({ row }) => <div className="w-[128px]">{row.original.capacity}</div>,
	},
	{
		accessorKey: "pilotName",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Pilot" />
		),
		cell: ({ row }) => (
			<div className="w-[128px]">{row.original.pilotName}</div>
		),
	},
	{
		accessorKey: "crewMemberNames",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Crew Members" />
		),
		cell: ({ row }) => (
			<>
				{row.original.crewMemberNames?.split(", ").map((name) => (
					<Fragment key={name}>
						<div className="w-[128px]">{name}</div>
						<br />
					</Fragment>
				))}
			</>
		),
	},
	{
		id: "actions",
		cell: ({ row }) => <AircraftsRowActions row={row} />,
	},
];
