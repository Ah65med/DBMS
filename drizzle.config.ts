import { defineConfig } from "drizzle-kit";
import { dbAuthToken, dbUrl } from "~/lib/env";

export default defineConfig({
	schema: ["./src/db/tables.ts", "./src/db/relations.ts", "./src/db/joins.ts"],
	out: "./drizzle/migrations",
	driver: "turso",
	dialect: "sqlite",
	dbCredentials: {
		url: dbUrl,
		authToken: dbAuthToken,
	},
});
