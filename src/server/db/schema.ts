import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const sensorType = sqliteTable("sensor-type", {
   id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
   name: text("name").notNull(),
   description: text("description"),
   units: text("units").notNull(),
});

export const device = sqliteTable("device", {
   id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
   name: text("name").notNull(),
   location: text("location"),
   mac: text("max-address"),
   ipAddress: text("ip-address").notNull(),
});

export const measuring = sqliteTable("measuring", {
   id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
   deviceId: integer("deviceId", { mode: "number" })
      .notNull()
      .references(() => device.id),
   sensorType: integer("sensorTypeId", { mode: "number" })
      .notNull()
      .references(() => sensorType.id),
   timestamp: integer("timestamp", { mode: "timestamp" })
      .default(sql`(CURRENT_TIMESTAMP)`)
      .notNull(),
   value: text("value").notNull(),
   status: integer("status", { mode: "number" }),
});
