"use server";

import { actionClient } from "@/lib/safe-action";
import { db } from "@/server/index";
import { device } from "./schema";
import { eq } from "drizzle-orm";
import { createDeviceSchema, deleteDeviceSchema, editDeviceSchema, getDeviceByIdSchema } from "@/server/types";
import { revalidatePath } from "next/cache";

export const createDeviceAction = actionClient.schema(createDeviceSchema).action(async ({ parsedInput: { name, location, mac, ipAddress, isEnabled } }) => {
   await db.insert(device).values({
      name: name,
      location: location,
      mac: mac.toUpperCase(),
      ipAddress: ipAddress,
      isEnabled: isEnabled,
   });
   revalidatePath("/device");
});

export const editDeviceAction = actionClient.schema(editDeviceSchema).action(async ({ parsedInput: { id, name, location, mac, ipAddress, isEnabled } }) => {
   await db.update(device).set({ name: name!, location: location!, mac: mac!.toUpperCase(), ipAddress: ipAddress!, isEnabled: isEnabled }).where(eq(device.id, id));
   revalidatePath("/device");
});

// Get All Devices
export const getDevicesAction = actionClient.action(async () => {
   const devices = await db.query.device.findMany();
   return devices;
});

export const getDeviceByIdAction = actionClient.schema(getDeviceByIdSchema).action(async ({ parsedInput: { id } }) => {
   const deviceById = await db.query.device.findFirst({ where: eq(device.id, id) });
   return deviceById;
});

export const deleteDeviceAction = actionClient.schema(deleteDeviceSchema).action(async ({ parsedInput: { id } }) => {
   await db.delete(device).where(eq(device.id, id));
   revalidatePath("/device");
});
