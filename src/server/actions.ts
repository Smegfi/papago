"use server";

import { actionClient } from "@/lib/safe-action";
import { db } from "@/server/index";
import { device } from "./schema";
import { eq } from "drizzle-orm";
import { createDeviceSchema, getDeviceByIdSchema } from "@/server/types";
import { revalidatePath } from "next/cache";

export const createDeviceAction = actionClient
   .schema(createDeviceSchema)
   .action(async ({ parsedInput: { name, location, mac, ipAddress, isEnabled } }) => {
      await db
         .insert(device)
         .values({
            id: 0,
            name: name,
            location: location,
            mac: mac,
            ipAddress: ipAddress,
            isEnabled: isEnabled,
         });
   revalidatePath("/device");
});

// Get All Devices
export const getDevicesAction = actionClient.action(async () => {
   const devices = await db.query.device.findMany();
   return devices;
});

export const getDeviceByIdAction = actionClient
   .schema(getDeviceByIdSchema)
   .action(async ({ parsedInput: { id } }) => {
      const deviceById = await db.query.device.findFirst({ where: eq(device.id, id) });
      return deviceById;
   });
