"use client";

import { Button } from "@/components/ui/button";
import { testConnectionAction } from "@/server/actions";
import { CheckCheck, Loader2, X } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

export function TestDeviceConnection({ ipAddress }: { ipAddress: string }) {
   const [buttonStyle, setButtonStyle] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const { execute, status, result } = useAction(testConnectionAction);

   function testConnection() {
      setIsLoading(true);
      try{
         const parsedIp = z.string().ip().parse(ipAddress);
         execute({ ipAddress: parsedIp });
      }
      catch{
         toast({
            title: "Zadej správnou IP adresu",
            description: "IP adresa musí být platná.",
         });
      }
      finally{
         setIsLoading(false);
      }
   }

   useEffect(() => {
      if (status === "hasSucceeded") {
         setButtonStyle("border-green-500");
         toast({
            title: "Úspěšně připojeno",
            description: (
               <pre>
                  <code>{JSON.stringify(result.data, null, 2)}</code>
               </pre>
            ),
         });
      } else if (status === "hasErrored") {
         setButtonStyle("animate-wiggle border-red-500");
         toast({
            title: "Připojení selhalo",
            description: "Připojení k zařízení selhalo.",
         });
      } else if (status === "executing") {
         setButtonStyle("");
      }
   }, [status]);

   return (
      <>
         <Button variant="outline" type="button" className={buttonStyle} onClick={testConnection} disabled={isLoading}>
            Test
            {status === "executing" ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {status === "hasSucceeded" ? <CheckCheck className="text-green-500" /> : null}
            {status === "hasErrored" ? <X className="text-red-500" /> : null}
         </Button>
      </>
   );
}
