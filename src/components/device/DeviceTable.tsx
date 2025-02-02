"use client";

import { DeleteDeviceDialog } from "@/components/modals/delete-device";
import { NewDeviceDialog } from "@/components/modals/new-device";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pen } from "lucide-react";
import type { device } from "@/server/db/schema";

export default function DeviceTable(props: { devices: (typeof device.$inferSelect)[] }) {
   const { devices } = props;

   function handleNewDevice() {}
   return (
      <div className="rounded-xl bg-muted/50">
         <NewDeviceDialog />
         <Table>
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
                        <DeleteDeviceDialog title={device.name} />
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
   );
}
