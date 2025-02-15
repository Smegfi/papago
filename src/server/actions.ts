"use server";

import { actionClient } from "@/lib/safe-action";
import { db } from "@/server/index";
import { device, measuringTest } from "./schema";
import { eq } from "drizzle-orm";
import { createDeviceSchema, deleteDeviceSchema, editDeviceSchema, getDeviceByIdSchema, testConnectionSchema } from "@/server/types";
import { revalidatePath } from "next/cache";
import { X2jOptions, XMLParser } from "fast-xml-parser";
import { z } from "zod";

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
   await db
      .update(device)
      .set({ name: name!, location: location!, mac: mac!.toUpperCase(), ipAddress: ipAddress!, isEnabled: isEnabled })
      .where(eq(device.id, id));
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

export const testConnectionAction = actionClient.schema(testConnectionSchema).action(async ({ parsedInput: { ipAddress } }) => {
   const response = await fetch(`http://${ipAddress}/fresh.xml`, { signal: AbortSignal.timeout(4000) });
   const xmlRaw = await response.text();

   const options: X2jOptions = {
      ignoreAttributes: false,
      attributeNamePrefix: "",
      ignorePiTags: true,
   };

   const parser = new XMLParser(options);
   const result = parser.parse(xmlRaw);

   return result;
});

export const testConnectionActionInternal = actionClient
   .schema(
      z.object({
         id: z.number(),
         ipAddress: z.string().ip(),
      })
   )
   .action(async ({ parsedInput: { id, ipAddress } }) => {
      const response = await fetch(`http://${ipAddress}/fresh.xml`, { signal: AbortSignal.timeout(4000) });
      const xmlRaw = await response.text();

      const options: X2jOptions = {
         ignoreAttributes: false,
         attributeNamePrefix: "",
         ignorePiTags: true,
      };

      const parser = new XMLParser(options);
      const result = parser.parse(xmlRaw);

      return { deviceId: id, rawData: result };
   });

export const fetchAllDevicesAction = actionClient.action(async () => {
   const devices = await db.query.device.findMany({ where: eq(device.isEnabled, true) });

   if (devices.length > 0) {
      const deviceCalls = [];
      for (const device of devices) {
         deviceCalls.push(testConnectionActionInternal({ id: device.id, ipAddress: device.ipAddress }));
      }

      const results = await Promise.all(deviceCalls);

      if (results.length > 0) {
         for (const result of results) {
            if (result) {
               await db.insert(measuringTest).values({
                  deviceId: result.data!.deviceId,
                  rawData: result.data!.rawData,
               });
            }
         }
      }
   }

   return devices;
});

export const getMeasuringAction = actionClient.action(async () => {
   const measuring = await db.query.measuringTest.findMany();
   return measuring;
});
