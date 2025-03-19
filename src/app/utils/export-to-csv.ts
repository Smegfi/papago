
import Papa from "papaparse";


export function exportToCSV(measuringValues: { data?: Array<{ deviceId: number | string; deviceName: string; location: string; values: Array<{ time: string | undefined; temperature: string | number; humidity: string | number; pressure: string | number }> }> }) {
    console.log("Export to CSV clicked");
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
       console.log("No data to export");
    }
 }