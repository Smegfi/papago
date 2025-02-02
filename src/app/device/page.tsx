import DeviceTable from "@/components/device/DeviceTable";
import { Button } from "@/components/ui/button";
import { db } from "@/server/db";
import { device } from "@/server/db/schema";

export default async function Page() {
   const devices = await db.select().from(device);

   async function handleNewDevice() {
      console.log("test");
      await db.insert(device).values({
         name: "Test 1",
         mac: "Test",
         location: "Test",
         ipAddress: "10.41.10.11",
      });
   }

   return <DeviceTable devices={devices} />;
}
