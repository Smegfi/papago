//import DeviceTable from "@/app/device/_components/device-table";
import { getDevicesAction } from "@/server/actions";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreateDeviceDialog } from "./create-device";
import { EditDeviceDialog } from "./edit-device";
import { Badge } from "@/components/ui/badge";
import { RemoveDeviceDialog } from "./delete-device";

export default async function Page() {
   const devices = await getDevicesAction();
   return (
      <>
         <h2 className="text-3xl font-semibold tracking-tight">Zařízení</h2>
         <div className="flex justify-end">
            <CreateDeviceDialog />
         </div>
         <Table>
            <TableCaption>Seznam zařízení.</TableCaption>
            <TableHeader>
               <TableRow>
                  <TableHead>Název</TableHead>
                  <TableHead className="w-[150px]">Umístění</TableHead>
                  <TableHead>MAC</TableHead>
                  <TableHead>IP Adresa</TableHead>
                  <TableHead className="w-[100px] text-center">Stav</TableHead>
                  <TableHead></TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {devices?.data?.map((device) => (
                  <TableRow key={device.id}>
                     <TableCell className="font-bold">{device.name}</TableCell>
                     <TableCell>{device.location}</TableCell>
                     <TableCell>{device.mac.toLowerCase()}</TableCell>
                     <TableCell>{device.ipAddress}</TableCell>
                     <TableCell className="text-center">
                        {device.isEnabled ? (
                           <Badge className="bg-green-600 text-white">Povoleno</Badge>
                        ) : (
                           <Badge className="bg-red-600 text-white">Zakázáno</Badge>
                        )}
                     </TableCell>
                     <TableCell>
                        <EditDeviceDialog deviceId={device.id} />
                        <RemoveDeviceDialog deviceId={device.id} />
                     </TableCell>
                     {/* TODO: Add device update and delete modal*/}
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </>
   );
}
