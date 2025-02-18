"use server";

import { actionClient } from "@/lib/safe-action";
import { db } from "@/server/index";
import {
   createDeviceSchema,
   deleteDeviceSchema,
   editDeviceSchema,
   getDeviceByIdSchema,
   getMeasuringByDeviceIdSchema,
   testConnectionSchema,
} from "@/server/types";
import { desc, eq } from "drizzle-orm";
import { X2jOptions, XMLParser } from "fast-xml-parser";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { device, measuring } from "./schema";

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
      .set({ name: name!, location: location!, mac: mac!.toUpperCase(), ipAddress: ipAddress!, isEnabled: isEnabled, updatedAt: new Date() })
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
   const calledDevices = [];
   if (devices.length > 0) {
      const deviceCalls = [];
      for (const device of devices) {
         deviceCalls.push(testConnectionActionInternal({ id: device.id, ipAddress: device.ipAddress }));
      }

      const results = await Promise.all(deviceCalls);

      if (results.length > 0) {
         for (const result of results) {
            if (result) {
               await db.insert(measuring).values({
                  deviceId: result.data!.deviceId,
                  rawData: result.data!.rawData,
               });
               calledDevices.push(devices.filter((d) => d.id === result.data!.deviceId));
            }
         }
      }
   }
   revalidatePath("/measuring");
   return calledDevices;
});

export const getMeasuringAction = actionClient.action(async () => {
   const measuring = await db.query.measuring.findMany();
   return measuring;
});

export const getMeasuringByDeviceIdAction = actionClient.schema(getMeasuringByDeviceIdSchema).action(async ({ parsedInput: { deviceId } }) => {
   const measure = await db.query.measuring.findMany({ where: eq(measuring.deviceId, deviceId) });
   return measure;
});

export const getMeasuringValuesByDeviceAction = actionClient.action(async () => {
   const result = [];
   const devices = await db.query.device.findMany({ where: eq(device.isEnabled, true) });

   for (const device of devices) {
      const foo = {
         deviceId: device.id,
         deviceName: device.name,
         location: device.location,
         values: [] as { time: string | undefined; temperature: string; humidity: string; pressure: string }[],
      };
      const measurings = await db.query.measuring.findMany({ where: eq(measuring.deviceId, device.id), limit: 5, orderBy: desc(measuring.timestamp) });
      for (const measuring of measurings) {
         const parsedData = JSON.parse(JSON.stringify(measuring.rawData));

         if (parsedData.root.sns.length > 1) {
            foo.values.push({
               time: measuring.timestamp?.toLocaleTimeString("cs-CZ", { hour: "2-digit", minute: "2-digit" }),
               temperature: parsedData.root.sns[0].val,
               humidity: parsedData.root.sns[0].val2,
               pressure: parsedData.root.sns[0].val3,
            });
         }
         else{
            foo.values.push({
               time: measuring.timestamp?.toLocaleTimeString("cs-CZ", { hour: "2-digit", minute: "2-digit" }),
               temperature: parsedData.root.sns.val,
               humidity: parsedData.root.sns.val2,
               pressure: parsedData.root.sns.val3,
            });
         }
      }
      result.push(foo);
   }
   return result;
});
