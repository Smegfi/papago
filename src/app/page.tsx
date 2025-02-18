import { TempreatureChart } from "@/components/charts/tempreature-chart";
import { getMeasuringValuesByDeviceAction } from "@/server/actions";

export default async function Page() {
   const measurings = await getMeasuringValuesByDeviceAction();

   return (
      <>
         <h2 className="text-3xl font-semibold tracking-tight">Dashboard</h2>
         <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            {measurings?.data?.map((measuring) => (
               <div className="aspect-video rounded-xl bg-muted/50" key={measuring.deviceId}>
                  <TempreatureChart data={measuring} />
               </div>
            ))}
         </div>
      </>
   );
}
