import { migrate } from "drizzle-orm/pglite/migrator";

import db from "./db";

async function applyMigrations() {
  await migrate(db, { migrationsFolder: "./drizzle" });
}

export { applyMigrations };
