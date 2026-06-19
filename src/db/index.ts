import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { dbAuthToken, dbUrl } from "~/lib/env";

import * as joins from "~/db/joins";
import * as relations from "~/db/relations";
import * as tables from "~/db/tables";

const turso = createClient({
	url: dbUrl,
	authToken: dbAuthToken,
});

export const db = drizzle(turso, {
	schema: { ...tables, ...relations, ...joins },
});
