"use server";

import { DeviceModalType } from "@/components/modals/create-device/device-modal";
import { db } from "./db";
import { device } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function createDeviceAction(deviceModel: DeviceModalType) {
   try {
      const res = await db
         .insert(device)
         .values({
            name: deviceModel.name,
            location: deviceModel.location,
            mac: deviceModel.mac,
            ipAddress: deviceModel.ipAddress,
         })
         .returning({
            id: device.id,
            name: device.name,
            location: device.location,
            mac: device.mac,
            ipAddress: device.ipAddress,
         });
      return { status: 200, message: `Zařízení ${res[0].name} bylo vytvořeno`, data: res[0] };
   } catch (e) {
      const error = e as Error;
      return { status: 400, message: error.message, data: error };
   }
}

export async function removeDeviceAction(id: number) {
   try {
      const result = (await db.delete(device).where(eq(device.id, id))).rowsAffected;
      if (result > 0) {
         return { status: 200, message: `Zařízení ${id} bylo smazáno` };
      } else {
         return { status: 400, message: `Nepodařilo se smazat zařízení` };
      }
   } catch (e) {
      const error = e as Error;
      return { status: 400, message: `${error.message}` };
   }
}

export async function getDevicesAction() {
   try {
      var result = await db.select().from(device);
      return { status: 200, message: "Done", data: result };
   } catch (e) {
      const error = e as Error;
      return { status: 400, message: "OK" };
   }
}
