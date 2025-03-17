"use client";
import { useState, useEffect } from "react";
import { Chart } from "@/components/charts/tempreature-chart";
import { getMeasuringValuesByDeviceAction } from "@/server/actions";
import { useAction } from "next-safe-action/hooks";
import { cs } from "date-fns/locale";
import type * as React from "react";
import {
   Sidebar,
   SidebarContent,
   SidebarFooter,
   SidebarHeader,
   SidebarSeparator,
   SidebarInset,
   SidebarProvider,
   SidebarTrigger,
} from "@/components/ui/sidebar";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";

const data = {
   user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
   },
   calendars: [
      {
         name: "My Calendars",
         items: ["Personal", "Work", "Family"],
      },
      {
         name: "Favorites",
         items: ["Holidays", "Birthdays"],
      },
      {
         name: "Other",
         items: ["Travel", "Reminders", "Deadlines"],
      },
   ],
};

interface SidebarRightProps extends React.ComponentProps<typeof Sidebar> {
   devicename: string;
   timeRange: DateRange;
   updateTimeRange: (newTimeRange: DateRange) => void;
}

export function SidebarRight({ devicename, timeRange, updateTimeRange, ...props }: SidebarRightProps) {
   const handleSelectRange = (range: DateRange | undefined) => {
      if (range && range.from && range.to) {
         updateTimeRange({ from: range.from, to: range.to });
      }
   };

   return (
      <Sidebar collapsible="none" className="sticky hidden lg:flex top-0 h-svh border-l z-index: 10"  {...props}>
         <SidebarHeader className="h-16 border-b border-sidebar-border">
            <span>{devicename}</span>
         </SidebarHeader>
         <SidebarContent>
            <Calendar
               mode="range"
               selected={{
                  from: timeRange.from ? new Date(timeRange.from) : undefined,
                  to: timeRange.to ? new Date(timeRange.to) : undefined,
               }}
               onSelect={handleSelectRange}
               locale={cs}
               className="border rounded-lg p-2"
            />

            <button
               className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4  hover:border-blue-500 rounded"
               onClick={() => updateTimeRange({ from: new Date(), to: new Date() })}
            >
               Aktualizovat
            </button>
         </SidebarContent>

<Select >
   <SelectTrigger className="w-full">
      <SelectValue placeholder="Select an option" />
   </SelectTrigger>
   
   <SelectContent >
      <SelectItem  value="test">Test</SelectItem>
   </SelectContent>
</Select>
         

         <SidebarFooter></SidebarFooter>
      </Sidebar>
   );
}

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

   const updateTimeRange = (newTimeRange: DateRange) => {
      setTimeRange(newTimeRange);
   };

   return (
      <>
         <SidebarProvider>
            <SidebarInset>
               <h2 className="text-3xl font-semibold tracking-tight">Dashboard</h2>
               <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                  {result?.data?.map((measuring) => (
                     <div className="aspect-video rounded-xl bg-muted/50" key={measuring.deviceId}>
                        <Chart data={measuring} dataType={dType.temperature} />
                        <Chart data={measuring} dataType={dType.humidity} />
                        <Chart data={measuring} dataType={dType.pressure} />
                     </div>
                  ))}
               </div>
            </SidebarInset>
            <SidebarRight devicename={deviceName} timeRange={timeRange} updateTimeRange={updateTimeRange} />
         </SidebarProvider>
      </>
   );
}
