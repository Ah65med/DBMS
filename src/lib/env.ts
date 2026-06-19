import * as dotenv from "dotenv";
import * as zod from "zod";

dotenv.config();

const { env } = process;

export const envSchema = zod.object({
	DOMAIN: zod.string().url(),
	TURSO_DATABASE_URL: zod.string().url(),
	TURSO_AUTH_TOKEN: zod.string().min(1),
});

export const envConfig = envSchema.parse(env);

export const domain = envConfig.DOMAIN;
export const dbUrl = envConfig.TURSO_DATABASE_URL;
export const dbAuthToken = envConfig.TURSO_AUTH_TOKEN;
