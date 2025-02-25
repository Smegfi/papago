import Test from "@/components/charts/test";

export default async function Page() {

   return (
      <>
         <h2 className="text-3xl font-semibold tracking-tight">Dashboard</h2>
         <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <Test foo={"temperature"} od={Date.now()} to={Date.now() + 1000 * 60 * 60 * 24} />

            <Test foo={"humidity"} od={Date.now()} to={Date.now() + 1000 * 60 * 60 * 24} />

            <Test foo={"pressure"} od={Date.now()} to={Date.now() + 1000 * 60 * 60 * 24} />
         </div>
      </>
   );
}
