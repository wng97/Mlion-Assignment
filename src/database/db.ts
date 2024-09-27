import { drizzle } from "drizzle-orm/node-postgres";
import { Pool, types } from "pg";
import * as schema from "./schema";

// Because JS doesn't support 64 bit ints.
// solution: Numeric type is oid 1700, so we set the type for it
types.setTypeParser(1700, (val) => parseFloat(val));

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Mlion01",
  password: "WnR0430",
  port: 5432,
});

const db = drizzle(pool, { schema });

export default db;
