"use client";
import { useState, useEffect } from "react";
import { cs } from "date-fns/locale";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getDevicesAction, getMeasuringValuesByDeviceAction } from "@/server/actions";
import { DateRange } from "react-day-picker";
import { useAction } from "next-safe-action/hooks";
import { Button } from "@/components/ui/button";
import * as Papa from "papaparse";

export function SidebarRight({ actionExecution }: { actionExecution: (input: { deviceName: string; from: Date; to: Date }) => void }) {
   const now = new Date();

   const [device, setDevice] = useState<string>("papago004");
   const [dateRange, setDateRange] = useState<DateRange | undefined>({ from: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), to: now });
   const { execute, result } = useAction(getDevicesAction);
   const { execute: executeMeasuringValues, result: measuringValues } = useAction(getMeasuringValuesByDeviceAction);

   useEffect(() => {
      execute();
   }, [execute]);

   useEffect(() => {
      if (dateRange?.from && dateRange?.to) {
         actionExecution({ deviceName: device, from: dateRange?.from, to: dateRange?.to });
         executeMeasuringValues({ deviceName: device, from: dateRange?.from, to: dateRange?.to });
      }
   }, [actionExecution, device, dateRange, executeMeasuringValues]);

   useEffect(() => {
      console.log("Measuring values:", measuringValues.data);
   }, [measuringValues]);

   const exportToCSV = () => {
      console.log("Export to CSV clicked");
      if (measuringValues?.data) {
         const flattenedData = measuringValues.data.flatMap(device => 
            device.values.map(value => ({
               ID_zařízení: device.deviceId,
               název_zažízení: device.deviceName,
               umístění: device.location,
               čas: value.time,
               teplota: value.temperature,
               vlhkost: value.humidity,
               rosný_bod: value.pressure,
            }))
         );

         const csv = Papa.unparse(flattenedData);
         const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
         const link = document.createElement("a");
         const url = URL.createObjectURL(blob);
         link.setAttribute("href", url);
         link.setAttribute("download", "dataPapago.csv");
         link.style.visibility = "hidden";
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
      } else {
         console.log("No data to export");
      }
   };

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
            <Button onClick={exportToCSV} className="mt-4">Export do CSV</Button>
         </SidebarContent>
      </Sidebar>
   );
}