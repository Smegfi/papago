"use client";
import { useState, useEffect } from "react";
import { cs } from "date-fns/locale";
import { Sidebar, SidebarContent, SidebarFooter } from "@/components/ui/sidebar";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getDevicesAction } from "@/server/actions";
import { DateRange } from "react-day-picker";
import { useAction } from "next-safe-action/hooks";

export function SidebarRight({ actionExecution }: { actionExecution: (input: { deviceName: string; from: Date; to: Date }) => void }) {
   const now = new Date();

   const [device, setDevice] = useState<string>("");
   const [dateRange, setDateRange] = useState<DateRange | undefined>({ from: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), to: now });
   const { execute, result } = useAction(getDevicesAction);

   useEffect(() => {
      execute();
   }, [execute]);

   useEffect(() => {
      if (dateRange?.from && dateRange?.to) {
         actionExecution({ deviceName: device, from: dateRange?.from, to: dateRange?.to });
      }
   }, [actionExecution, device, dateRange]);

   return (
      <Sidebar collapsible="none" className="sticky hidden lg:flex top-0 h-svh border-l z-10">
         <SidebarContent>
            <Calendar mode="range" selected={dateRange} onSelect={setDateRange} locale={cs} className="border rounded-lg p-2" />
            <Select onValueChange={(value) => setDevice(value)}>
               <SelectTrigger className="w-full">
                  <SelectValue placeholder="Dostupná zařízení: ">{device}</SelectValue>
               </SelectTrigger>
               <SelectContent className="absolute z-20">
                  {result?.data?.map((device) => (
                     <SelectItem key={device.id} value={device.name}>
                        {device.name}
                     </SelectItem>
                  ))}
               </SelectContent>
            </Select>
         </SidebarContent>
      </Sidebar>
   );
}
