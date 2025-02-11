import DeviceTable from "@/components/device/device-table";
import { Button } from "@/components/ui/button";
import { db } from "@/server/db";
import { device } from "@/server/db/schema";

export default async function Page() {
   return <DeviceTable />;
}
