"use client";

import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface MeasuringValues {
   deviceId: number;
   deviceName: string;
   location: string;
   values: {
      time: string | undefined;
      temperature: string;
      humidity: string;
      pressure: string;
   }[];
}

export function ExportButton({ measuringValues }: { measuringValues: MeasuringValues[] }) {
   function exportToCSV(measuringValues: MeasuringValues[]) {
      toast({
         title: "Připravuji export dat....",
         description: "Data budou co nevidět připravena ke stažení",
      });

      if (measuringValues && measuringValues.length > 0) {
         const flattenedData = measuringValues.flatMap((device) =>
            device.values.map((value) => ({
               "Id zařízení": device.deviceId,
               "Název zařízení": device.deviceName,
               Umístění: device.location,
               Čas: value.time,
               Teplota: value.temperature,
               Vlhkost: value.humidity,
               "Rosný bod": value.pressure,
            }))
         );

         const csv = Papa.unparse(flattenedData);
         const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
         const link = document.createElement("a");
         const url = URL.createObjectURL(blob);

         link.setAttribute("href", url);
         link.setAttribute("download", "dataPapago.csv");
         link.style.visibility = "hidden";
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
      } else {
         toast({
            title: "Nejsou zvolena žádná data",
            description: "Nejdříve je potřeba vybrat data k exportování",
         });
      }
   }

   return (
      <Button onClick={() => exportToCSV(measuringValues)} className="mt-4">
         Export do CSV
      </Button>
   );
}
