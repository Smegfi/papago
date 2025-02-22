import { drizzle } from "drizzle-orm/node-postgres";
import * as schemas from "@/server/schema";

export const db = drizzle({
   connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: false,
   },
   schema: schemas,
   logger: true,
});
