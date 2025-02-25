"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useAction } from "next-safe-action/hooks";
import { getDevicesAction } from "@/server/actions";

const mockData = {
   deviceId: 1,
   deviceName: "Device 1",
   dataType: "temperature",
   data: [
      {
         measuringTime: "2025-02-20T00:13:15",
         value: 22.3,
      },
      {
         measuringTime: "2025-02-20T00:14:15",
         value: 23.1,
      },
      {
         measuringTime: "2025-02-20T00:15:15",
         value: 23.9,
      },
   ],
};

export default function Test({ foo, od, to }: { foo: string; od: number; to: number }) {
   const [odData] = useState(od);
   const [toData] = useState(to);
   const [test] = useState(foo);

   const { execute, result } = useAction(getDevicesAction);

   useEffect(() => {
      execute();
   }, [execute]);

   return (
      <Card>
         <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>{test}</CardTitle>
            <Select>
               <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="device" />
               </SelectTrigger>
               <SelectContent>
                  {
                     result?.data?.map((device) => (
                        <SelectItem key={device.id} value={device.id.toString()}>
                           {device.name}
                        </SelectItem>
                     ))
                  }
               </SelectContent>
            </Select>
         </CardHeader>
         <CardContent>
            <p>Datové hodnoty:{test}</p>
            <p>Od:{odData.toString()}</p>
            <p>Do:{toData.toString()}</p>
            <p>Data:{mockData.data.length}</p>
         </CardContent>
      </Card>
   );
}
