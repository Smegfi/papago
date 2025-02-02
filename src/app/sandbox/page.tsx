import { db } from "@/server/db";
import { device, measuring, sensorType } from "@/server/db/schema";

export default async function Page() {
   const devices = await await db.select().from(device);
   return (
      <>
         <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50">Schema table</div>
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
         </div>
      </>
   );
}
