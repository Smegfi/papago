"use client";

import { Chart } from "@/components/charts/tempreature-chart";
import { getMeasuringValuesByDeviceAction } from "@/server/actions";
import { useAction } from "next-safe-action/hooks";
import { SidebarRight } from "@/components/navigation/select-panel";
import * as React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { dType } from "@/components/charts/tempreature-chart";

export default function Page() {
   const { execute, result } = useAction(getMeasuringValuesByDeviceAction);

   return (
      <>
         <SidebarProvider>
            <SidebarInset>
               <h2 className="text-3xl font-semibold tracking-tight">Přístrojová deska</h2>
               <div className="grid auto-rows-max gap-1 md:grid-cols-3">
                  {result?.data?.map((measuring) => (
                     <React.Fragment key={measuring.deviceId}>
                        <div className="aspect-video rounded-xl bg-muted/50">
                           <Chart data={measuring} dataType={dType.temperature} />
                        </div>
                        <div className="aspect-video rounded-xl bg-muted/50">
                           <Chart data={measuring} dataType={dType.humidity} />
                        </div>
                        <div className="aspect-video rounded-xl bg-muted/50">
                           <Chart data={measuring} dataType={dType.pressure} />
                        </div>
                     </React.Fragment>
                  ))}
               </div>
            </SidebarInset>
            <SidebarRight actionExecution={execute} />
         </SidebarProvider>
      </>
   );
}
