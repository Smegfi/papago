import DeviceTable from "@/components/device/device-table";

export default async function Page() {
   return (
      <>
         <h2 className="text-3xl font-semibold tracking-tight">Zařízení</h2>
         <DeviceTable />
      </>
   );
}
