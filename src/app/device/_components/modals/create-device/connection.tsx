"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { CheckCheck, Loader2 } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

export default function DeviceConnectionTest({ ipAddress }: { ipAddress: string }) {
   const [loading, setLoading] = useState<boolean>(false);
   const [success, setSuccess] = useState<boolean>(false);

   function handleConnectionTest(address: string) {
      setSuccess(false);
      try {
         const ipv4 = z.string().ip();
         const parsedAddress = ipv4.parse(address);
         setLoading(true);
         fetch(`/api?ipAddress=${address}`, {
            signal: AbortSignal.timeout(4000),
         })
            .then((response) => {
               if (!response.ok) {
                  throw new Error("Zařízení nevrátilo odpověď.");
               }
               return response.json();
            })
            .then((data) => {
               toast({
                  title: "Připojeno",
                  description: (
                     <>
                        <p>Zařízení bylo úspěšně připojeno</p>
                        <pre>
                           <code className="text-xs">{JSON.stringify(data, null, 2)}</code>
                        </pre>
                     </>
                  ),
               });
               setSuccess(true);
            })
            .catch(() => {
               toast({
                  variant: "destructive",
                  title: "Chyba",
                  description: "Zařízení není dostupné, opakuj akci později.",
               });
            })
            .finally(() => {
               setLoading(false);
            });
      } catch {}
   }

   return (
      <>
         {loading ? (
            <Button variant={"outline"} type="button" disabled>
               Test
               <Loader2 className="animate-spin" />
            </Button>
         ) : success ? (
            <Button variant={"outline"} type="button" className="border-green-600" onClick={() => handleConnectionTest(ipAddress)}>
               Test
               <CheckCheck className="text-green-600" />
            </Button>
         ) : (
            <Button variant={"outline"} type="button" onClick={() => handleConnectionTest(ipAddress)}>
               Test
            </Button>
         )}
      </>
   );
}
