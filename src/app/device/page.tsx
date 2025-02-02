"use client";

import { DeleteDeviceDialog } from "@/components/modals/delete-device";
import { NewDeviceDialog } from "@/components/modals/new-device";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pen, Trash } from "lucide-react";
import { useState } from "react";

export default function Page() {
   const foo = [
      {
         name: "Router A1",
         type: "Router",
         location: "Kancelář 1",
         ip: "192.168.1.1",
      },
      {
         name: "Switch B1",
         type: "Switch",
         location: "Datové centrum",
         ip: "192.168.1.2",
      },
      {
         name: "Firewall C1",
         type: "Firewall",
         location: "Kancelář 2",
         ip: "192.168.1.3",
      },
      {
         name: "Access Point D1",
         type: "Access Point",
         location: "Kancelář 3",
         ip: "192.168.1.4",
      },
      {
         name: "Server E1",
         type: "Server",
         location: "Datové centrum",
         ip: "192.168.1.5",
      },
      {
         name: "Printer F1",
         type: "Printer",
         location: "Kancelář 4",
         ip: "192.168.1.6",
      },
      {
         name: "NAS G1",
         type: "NAS",
         location: "Datové centrum",
         ip: "192.168.1.7",
      },
      {
         name: "Modem H1",
         type: "Modem",
         location: "Kancelář 5",
         ip: "192.168.1.8",
      },
      {
         name: "Repeater I1",
         type: "Repeater",
         location: "Kancelář 6",
         ip: "192.168.1.9",
      },
   ];

   const [devices, setDevices] = useState(foo);

   function AddNewDevice(name: string, type: string, location: string, address: string) {
      const tempDevices = devices;
      setDevices([...tempDevices, { name: name, type: type, location: location, ip: address }]);
   }

   return (
      <div className="rounded-xl bg-muted/50">
         <div className="p-4">
            <NewDeviceDialog addDeviceFunc={AddNewDevice} />
         </div>
         <Table>
            <TableHeader>
               <TableRow>
                  <TableHead>Název</TableHead>
                  <TableHead>Typ</TableHead>
                  <TableHead>Umístění</TableHead>
                  <TableHead>IP Adresa</TableHead>
                  <TableHead></TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {devices.map((item) => (
                  <TableRow key={item.ip}>
                     <TableCell className="font-medium">{item.name}</TableCell>
                     <TableCell>{item.type}</TableCell>
                     <TableCell>{item.location}</TableCell>
                     <TableCell>{item.ip}</TableCell>
                     <TableCell>
                        <Button variant={"ghost"} size={"icon"}>
                           <Pen />
                        </Button>
                        <DeleteDeviceDialog title={item.name} />
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
   );
}
