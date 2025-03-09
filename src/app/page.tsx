
'use client'
import { useState, useEffect } from 'react';
import { Chart } from "@/components/charts/tempreature-chart";
import { getMeasuringValuesByDeviceAction } from "@/server/actions";
import { useAction } from "next-safe-action/hooks";

export enum dType {
   temperature = "temperature",
   pressure = "pressure",
   humidity = "humidity"
}

interface TimeRange {
   start: string;
   end: string;
}

export default function Page() {
   const [now, setNow] = useState(new Date());
   const [timeRange, setTimeRange] = useState<TimeRange>({ start: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(), end: now.toISOString() });
   const [deviceName, setDeviceName] = useState<string>("papago004");

   const { execute, result } = useAction(getMeasuringValuesByDeviceAction);

   useEffect(() => {
      execute({ deviceName, start: timeRange.start, end: timeRange.end });
      setNow(new Date());
   }, [timeRange, deviceName, execute]);

   const updateTimeRange = (newTimeRange: TimeRange) => {
      setTimeRange(newTimeRange);
   };

   return (
      <>
         <h2 className="text-3xl font-semibold tracking-tight">Dashboard</h2>
         <button onClick={() => updateTimeRange({ start: "", end: "" })}>Fetch All Data</button>
         <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            {result?.data?.map((measuring) => (
               <div className="aspect-video rounded-xl bg-muted/50" key={measuring.deviceId}>
                  <Chart data={measuring} dataType={dType.temperature} />
                  <Chart data={measuring} dataType={dType.humidity} />
                  <Chart data={measuring} dataType={dType.pressure} />
               </div>
            ))}
         </div>
      </>
   );
}

