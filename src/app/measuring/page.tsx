import { getMeasuringAction } from "@/server/actions";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function Page() {
   const measuring = await getMeasuringAction();
   return (
      <>
         <h2 className="text-3xl font-semibold tracking-tight">Měření</h2>
         <Table>
            <TableCaption>Seznam měření.</TableCaption>
            <TableHeader>
               <TableRow>
                  <TableHead>Id zařízení</TableHead>
                  <TableHead>Čas měření</TableHead>
                  <TableHead>Data</TableHead>
               </TableRow>
            </TableHeader>
               <TableBody>
                  {measuring?.data?.map((item) => (
                     <TableRow key={item.id}>
                     <TableCell className="font-bold">{item.deviceId}</TableCell>
                     <TableCell>{item.timestamp?.toLocaleString("cs-CZ", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</TableCell>
                     <TableCell>
                        <ScrollArea className="h-64 rounded-md border">
                           <pre>
                              <code className="text-xs">
                                 {JSON.stringify(item.rawData, null, 2)}
                              </code>
                           </pre>
                        </ScrollArea>
                     </TableCell>
                  </TableRow>
                  ))}
               </TableBody>
            </Table>
      </>
   );
}
