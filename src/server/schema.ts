import { relations } from "drizzle-orm";
import { boolean, integer as int, json, serial, pgTable as table, varchar as text, timestamp } from "drizzle-orm/pg-core";

export const device = table("device", {
   id: serial("id").primaryKey(),
   name: text("name", { length: 128 }).notNull(),
   location: text("location", { length: 128 }).notNull(),
   mac: text("mac", { length: 256 }).notNull(),
   ipAddress: text("ip_address", { length: 256 }).notNull(),
   isEnabled: boolean("is_enabled").default(false),
   createdAt: timestamp("created_at", {mode: "date"}).defaultNow(),
   updatedAt: timestamp("updated_at", {mode: "date"}).defaultNow(),
});

export const measuring = table("measuring", {
   id: serial("id").primaryKey(),
   deviceId: int("deviceId")
      .notNull()
      .references(() => device.id),
   timestamp: timestamp("timestamp", {mode: "date"}).defaultNow(),
   rawData: json("raw_data").notNull(),
});

export const measuringRelations = relations(measuring, ({ one }) => ({
	device: one(device, { fields: [measuring.deviceId], references: [device.id] }),
}));
