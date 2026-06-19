import { relations } from "drizzle-orm";
import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { airline_table, airport_table } from "./tables";

export const airports_to_airlines_table = sqliteTable(
	"airports_to_airlines",
	{
		airport_id: text("airport_id")
			.notNull()
			.references(() => airport_table.id),
		airline_id: text("airline_id")
			.notNull()
			.references(() => airline_table.id),
	},
	(table) => ({
		pk: primaryKey({ columns: [table.airport_id, table.airline_id] }),
	}),
);

export const airports_to_airlines_relations = relations(
	airports_to_airlines_table,
	({ one }) => ({
		airport: one(airport_table, {
			fields: [airports_to_airlines_table.airport_id],
			references: [airport_table.id],
		}),
		airline: one(airline_table, {
			fields: [airports_to_airlines_table.airline_id],
			references: [airline_table.id],
		}),
	}),
);
