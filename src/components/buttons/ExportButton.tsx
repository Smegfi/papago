"use client";
import Papa from "papaparse";
//import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

export function ExportButton({ measuringValues }: { measuringValues: { data?: Array<{ deviceId: number | string; deviceName: string; location: string; values: Array<{ time: string | undefined; temperature: string | number; humidity: string | number; pressure: string | number }> }> } }) {



    function exportToCSV(measuringValues: { data?: Array<{ deviceId: number | string; deviceName: string; location: string; values: Array<{ time: string | undefined; temperature: string | number; humidity: string | number; pressure: string | number }> }> }) {
    /*
        const { toast } = useToast()
     
     
        toast({
           title: "Připravuji export dat....",
           description: "Data budou co nevidět připravena ke stažení"
     });*/

     console.log("")
     
     
         if (measuringValues?.data) {
            const flattenedData = measuringValues.data.flatMap(device => 
               device.values.map(value => ({
                  ID_zařízení: device.deviceId,
                  název_zažízení: device.deviceName,
                  umístění: device.location,
                  čas: value.time,
                  teplota: value.temperature,
                  vlhkost: value.humidity,
                  rosný_bod: value.pressure,
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
            /*
           toast({
              title: "Nejsou zvolena žádná data",
              description: "Nejdříve je potřeba vybrat data k exportování",
           });*/
           console.log("No data selected")
         }
      }


  return (
    <Button onClick={() => exportToCSV(measuringValues)} className="mt-4">
      Export do CSV
    </Button>
  );
}