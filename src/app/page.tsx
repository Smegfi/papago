'use client';

import { useState, useEffect } from "react";
import { Chart } from "@/components/charts/tempreature-chart";
import { getMeasuringValuesByDeviceAction, getDevicesAction } from "@/server/actions";
import { useAction } from "next-safe-action/hooks";
import { cs } from "date-fns/locale";
import type * as React from "react";
import {
   Sidebar,
   SidebarContent,
   SidebarFooter,
   SidebarHeader,
   SidebarInset,
   SidebarProvider,
} from "@/components/ui/sidebar";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";

interface Device {
   id: number;
   name: string;
   location: string;
   mac: string;
   ipAddress: string;
   isEnabled: boolean | null;
}

interface SidebarRightProps extends React.ComponentProps<typeof Sidebar> {
   devicename: string;
   timeRange: DateRange;
   updateTimeRange: (newTimeRange: DateRange, selectedDevice: string) => void;
}

export function SidebarRight({ devicename, timeRange, updateTimeRange, ...props }: SidebarRightProps) {
   const [devices, setDevices] = useState<Device[]>([]);
   const [selectedDevice, setSelectedDevice] = useState<string>(devicename);
   const fetchDevices = getDevicesAction;

   useEffect(() => {
      const loadDevices = async () => {
         const fetchedDevices = await fetchDevices();
         if (fetchedDevices) {
            if (fetchedDevices.data) {
               setDevices(fetchedDevices.data);
            }
         }
      };
      loadDevices();
   }, [fetchDevices]);

   const handleSelectRange = (range: DateRange | undefined) => {
      if (range && range.from && range.to) {
         updateTimeRange({ from: range.from, to: range.to }, selectedDevice);
      }
   };

   const handleDeviceChange = (deviceName: string) => {
      setSelectedDevice(deviceName);
   };

   return (
      <Sidebar collapsible="none" className="sticky hidden lg:flex top-0 h-svh border-l z-10" {...props}>
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
             <Select onValueChange={handleDeviceChange}>
            <SelectTrigger className="w-full">
               <SelectValue placeholder="Select a device" />
            </SelectTrigger>
            <SelectContent className="absolute z-20">
               {devices.map((device) => (
                  <SelectItem key={device.id} value={device.name}>
                     {device.name}
                  </SelectItem>
               ))}
            </SelectContent>
         </Select>

            <button
               className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 hover:border-blue-500 rounded"
               onClick={() => updateTimeRange({ from: new Date(), to: new Date() }, selectedDevice)}
            >
               Aktualizovat
            </button>
         </SidebarContent>
        
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

   const updateTimeRange = (newTimeRange: DateRange, selectedDevice: string) => {
      setTimeRange(newTimeRange);
      setDeviceName(selectedDevice);
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