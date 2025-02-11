"use client";

import { DeleteDeviceDialog } from "@/components/device/modals/delete-device/dialog";
import { NewDeviceDialog } from "@/components/device/modals/create-device/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, Pen } from "lucide-react";
import { useEffect, useState } from "react";
import { getDevicesAction } from "@/server/actions";
import { Device } from "@/server/types";
import { toast } from "@/hooks/use-toast";

export default function DeviceTable() {
   const [dataLoaded, setDataLoaded] = useState<boolean>(false);
   const [devices, setDevices] = useState<Device[]>([]);

   function getData() {
      setDataLoaded(false);
      getDevicesAction()
         .then((response) => {
            if (response.status === 200 && response.data != null) {
               setDevices(response.data as Device[]);
            } else {
               toast({
                  variant: "destructive",
                  title: "Chyba načítání dat!",
                  description: (
                     <div>
                        <p>Data nebylo možné načíst</p>
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                           <code className="text-xs">{JSON.stringify(response, null, 2)}</code>
                        </pre>
                     </div>
                  ),
               });
            }
         })
         .finally(() => {
            setDataLoaded(true);
         });
   }

   useEffect(() => {
      getData();
   }, []);

   function createDevice(device: Device) {
      setDevices([...devices, device]);
   }

   function removeDevice(device: Device) {
      const newDevices = devices.filter((i) => i.id !== device.id);
      setDevices(newDevices);
   }

   return (
      <div className="rounded-xl bg-muted/50">
         <div className="p-4 w-full flex justify-end">
            <NewDeviceDialog newItem={(device: Device) => createDevice(device)} />
         </div>
         <Table>
            <TableCaption hidden={dataLoaded}>
               <Loader2 className="animate-spin" />
               Načítání dat...
            </TableCaption>
            <TableHeader>
               <TableRow>
                  <TableHead>Název</TableHead>
                  <TableHead>Umístění</TableHead>
                  <TableHead>Mac adresa</TableHead>
                  <TableHead>IP Adresa</TableHead>
                  <TableHead></TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {devices.map((device) => (
                  <TableRow key={device.id}>
                     <TableCell className="font-medium">{device.name}</TableCell>
                     <TableCell>{device.location}</TableCell>
                     <TableCell>{device.mac}</TableCell>
                     <TableCell>{device.ipAddress}</TableCell>
                     <TableCell>
                        <Button variant={"ghost"} size={"icon"}>
                           <Pen />
                        </Button>
                        <DeleteDeviceDialog device={device} removeDevice={(device) => removeDevice(device)} />
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
   );
}
