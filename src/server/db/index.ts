import { drizzle } from "drizzle-orm/libsql";
import * as schemas from "@/server/db/schema";

export const db = drizzle({ connection: { url: "file:/workspaces/papago/src/server/dev-database.db" }, schema: { schemas } });
