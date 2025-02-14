import { DeleteDeviceDialog } from "@/app/device/_components/modals/delete-device/dialog";
import { NewDeviceDialog } from "@/app/device/_components/modals/create-device/dialog";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { EditDeviceDialog } from "./modals/update-device/dialog";
import { getDevicesAction } from "@/server/actions";

export default async function DeviceTable() {
   const data = await getDevicesAction();

   return (
      <div className="rounded-xl bg-muted/50">
         <div className="p-4 w-full flex justify-end">
            <NewDeviceDialog />
         </div>
         <Table>
            <TableHeader>
               <TableRow>
                  <TableHead>Název</TableHead>
                  <TableHead>Umístění</TableHead>
                  <TableHead>Mac adresa</TableHead>
                  <TableHead>IP Adresa</TableHead>
                  <TableHead>Povoleno</TableHead>
                  <TableHead></TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {data.map((device) => (
                  <TableRow key={device.id}>
                     <TableCell className="font-medium">{device.name}</TableCell>
                     <TableCell>{device.location}</TableCell>
                     <TableCell>{device.mac}</TableCell>
                     <TableCell>{device.ipAddress}</TableCell>
                     <TableCell>{device.isEnabled ? "Ano" : "Ne"}</TableCell>
                     <TableCell>
                        <EditDeviceDialog item={device} />
                        <DeleteDeviceDialog device={device} />
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
   );
}
