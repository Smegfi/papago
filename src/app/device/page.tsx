//import DeviceTable from "@/app/device/_components/device-table";
import { getDevicesAction } from "@/server/actions";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreateDeviceDialog } from "./create-device";

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
                  <TableHead className="w-[100px]">Název</TableHead>
                  <TableHead>Umístění</TableHead>
                  <TableHead>MAC</TableHead>
                  <TableHead>IP Adresa</TableHead>
                  <TableHead>Stav</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {devices?.data?.map((device) => (
                  <TableRow key={device.id}>
                     <TableCell className="font-medium">{device.name}</TableCell>
                     <TableCell>{device.location}</TableCell>
                     <TableCell>{device.mac}</TableCell>
                     <TableCell>{device.ipAddress}</TableCell>
                     <TableCell>{device.isEnabled ? "Povoleno" : "Zakázáno"}</TableCell>
                     {/* TODO: Add device update and delete modal*/}
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </>
   );
}
