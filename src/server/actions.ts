"use server";

import { db } from "./db";
import { device } from "./db/schema";
import { Device } from "./types";

export async function createDeviceAction(deviceModel: Device) {
   const res = await db.insert(device).values({
      name: deviceModel.name,
      location: deviceModel.location,
      mac: deviceModel.mac,
      ipAddress: deviceModel.ipAddress,
   });

   return { message: "vole" };
}
