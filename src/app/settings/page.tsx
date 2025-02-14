import { FormControl, FormDescription, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Page() {
   return (
      <>
         <h2 className="text-3xl font-semibold tracking-tight">Nastavení</h2>
         <div className="rounded-xl bg-muted/50">
            <div className="p-4 w-1/3">
               <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Načítání dat</h4>
               <p className="mt-2">Pomocí cron úlohy se dá nastavit četnost stahování dat z teploměrů. Minimální možná hodnota je jednou za minutu</p>
               <p className="mt-2">
                  Více informací o tom jak funguje cron a jak správně nastavit hodnotu k dočtění{" "}
                  <a href="https://crontab.guru/" target="_blank" className="underline">
                     zde
                  </a>
               </p>
               <div className="mt-4">
                  <Input placeholder="* * * * *" />
               </div>
            </div>
         </div>
      </>
   );
}
