import { sql } from "drizzle-orm";
import { integer as int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const device = sqliteTable("device", {
   id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
   name: text("name", { length: 128 }).notNull(),
   location: text("location", { length: 128 }).notNull(),
   mac: text("mac", { length: 256 }).notNull(),
   ipAddress: text("ip_address", { length: 256 }).notNull(),
   isEnabled: int("is_enabled", { mode: "boolean" }).default(false),
   createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
   updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`).$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

export const measuring = sqliteTable("measuring", {
   id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
   deviceId: int("deviceId", { mode: "number" })
      .notNull()
      .references(() => device.id),
   timestamp: int("timestamp", { mode: "timestamp" })
      .default(sql`(CURRENT_TIMESTAMP)`)
      .notNull(),
   value: text("value", { length: 128 }).notNull(),
   status: int("status", { mode: "number" }).notNull(),
   units: int("units", { mode: "number" }).notNull(),
});
