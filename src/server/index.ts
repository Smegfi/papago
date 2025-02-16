import { drizzle } from "drizzle-orm/node-postgres";
import * as schemas from "@/server/schema";

export const db = drizzle(process.env.DATABASE_URL!, {schema: schemas });
