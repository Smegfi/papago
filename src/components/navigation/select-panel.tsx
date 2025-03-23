"use client";

import { useState, useEffect } from "react";
import { cs } from "date-fns/locale";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import DeviceSelection from "@/components/navigation/device-selection";

export function SidebarRight({
   actionExecution,
   children,
}: {
   actionExecution: (input: { deviceName: string; from: Date; to: Date }) => void;
   children: React.ReactNode;
}) {
   const now = new Date();
   const [dateRange, setDateRange] = useState<DateRange | undefined>({ from: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), to: now });
   const [device, setDevice] = useState<string>("");

   useEffect(() => {
      if (dateRange?.from && dateRange?.to) {
         actionExecution({ deviceName: device, from: dateRange?.from, to: dateRange?.to });
      }
   }, [actionExecution, device, dateRange]);

   return (
      <Sidebar collapsible="none" className="sticky hidden lg:flex top-0 h-svh border-l">
         <SidebarContent>
            <Calendar min={0} max={14} mode="range" selected={dateRange} onSelect={setDateRange} locale={cs} className="border rounded-lg p-2" />
            <DeviceSelection selectedDeviceChange={setDevice} />
            {children}
         </SidebarContent>
      </Sidebar>
   );
}
