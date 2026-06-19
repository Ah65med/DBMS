import { readdirSync } from "node:fs";
import { join, resolve } from "node:path";

const seedsDir = resolve(process.cwd(), "src/seeds");

const files = readdirSync(seedsDir);

const seedFiles = files.filter((file) => file.endsWith(".seed.ts"));

(async () => {
	for (const file of seedFiles) {
		const filePath = join(seedsDir, file);
		try {
			const seedModule = await import(filePath);
			if (typeof seedModule.default === "function") {
				await seedModule.default();
			} else {
				console.log(`No default function exported from ${file}`);
			}
		} catch (err) {
			console.error(`Error running seed file ${file}:`, err);
		}
	}
})();
