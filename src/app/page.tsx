'use client';

import { useState, useEffect } from "react";
import { Chart } from "@/components/charts/tempreature-chart";
import { getMeasuringValuesByDeviceAction, getDevicesAction } from "@/server/actions";
import { useAction } from "next-safe-action/hooks";
import { SidebarRight } from "@/components/navigation/select-panel";
import * as React from "react";
import { DateRange } from "react-day-picker";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";







export enum dType {
   temperature = "temperature",
   pressure = "pressure",
   humidity = "humidity",
}

export default function Page() {
   const [now, setNow] = useState(new Date());
   const [timeRange, setTimeRange] = useState<DateRange>({
      from: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
      to: now,
   });
   const [deviceName, setDeviceName] = useState<string>("papago004");

   const { execute, result } = useAction(getMeasuringValuesByDeviceAction);

   useEffect(() => {
      if (timeRange.from && timeRange.to) {
         execute({ deviceName, date: { from: timeRange.from, to: timeRange.to } });
      }
      setNow(new Date());
   }, [timeRange, deviceName, execute]);

   const updateTimeRange = (newTimeRange: DateRange, selectedDevice: string) => {
      setTimeRange(newTimeRange);
      setDeviceName(selectedDevice);
   };

   return (
      <>
        <SidebarProvider>
   <SidebarInset>
      <h2 className="text-3xl font-semibold tracking-tight">Dashboard</h2>
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
   <SidebarRight devicename={deviceName} timeRange={timeRange} updateTimeRange={updateTimeRange} />
</SidebarProvider>
      </>
   );
}