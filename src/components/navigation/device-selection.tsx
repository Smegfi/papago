"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getDevicesAction } from "@/server/actions";
import { useAction } from "next-safe-action/hooks";
import { useEffect, useState } from "react";

export default function DeviceSelection({selectedDeviceChange}: {selectedDeviceChange: (device: string) => void}) {
   const [selectedDevice, setSelectedDevice] = useState<string>("");

   const { execute, result } = useAction(getDevicesAction, {
      onSuccess: (result) => {
         // Pokud je více zařízení, tak vyber první a nastav
         if (result.data && result.data.length > 0) {
            handleDeviceChange(result.data[0].name);
         }
      },
   });

   useEffect(() => {
      execute();
   }, [execute]);

   function handleDeviceChange(device: string) {
      setSelectedDevice(device);
      selectedDeviceChange(device);
   }

   return (
      <Select onValueChange={(value) => handleDeviceChange(value)} value={selectedDevice}>
         <SelectTrigger className="w-full">
            <SelectValue placeholder="Vyberte zařízení" />
         </SelectTrigger>
         <SelectContent>
            {result?.data?.map((device) => (
               <SelectItem key={device.id} value={device.name}>
                  {device.name}
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   );
}