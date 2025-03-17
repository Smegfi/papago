"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { cs } from "date-fns/locale";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarInset,
    SidebarProvider,
 } from "@/components/ui/sidebar";
 import { Calendar } from "@/components/ui/calendar";
 import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/datePickerWithRange";
import { getDevicesAction } from "@/server/actions";
import { DateRange } from "react-day-picker";


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
             <DatePickerWithRange/>
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
                <SelectValue placeholder="Select a device: ">
                   {devicename}</SelectValue>
                
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
 