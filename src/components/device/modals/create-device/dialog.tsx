"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { DeviceModal, DeviceModalType } from "@/components/device/modals/create-device/device-modal";
import { Loader2, Plus } from "lucide-react";
import { createDeviceAction } from "@/server/actions";
import { Device } from "@/server/types";
import DeviceConnectionTest from "./connection";

export function NewDeviceDialog({ newItem }: { newItem: (device: Device) => void }) {
   const [isOpen, setOpen] = useState(false);
   const [isLoading, setLoading] = useState(false);

   const form = useForm<z.infer<typeof DeviceModal>>({
      resolver: zodResolver(DeviceModal),
      defaultValues: {
         name: "",
         location: "",
         mac: "",
         ipAddress: "",
      },
      mode: "onChange",
      reValidateMode: "onChange",
      delayError: 200,
   });

   function onSubmit(data: z.infer<typeof DeviceModal>) {
      setLoading(true);

      const newData: DeviceModalType = {
         name: data.name,
         location: data.location,
         mac: data.mac,
         ipAddress: data.ipAddress,
      };

      createDeviceAction(data)
         .then((result) => {
            if (result.status == 200) {
               toast({
                  title: "Vytvořeno",
                  description: result.message,
               });
               newItem(result.data as Device);
            } else {
               toast({
                  variant: "destructive",
                  title: "Chyba",
                  description: result.message,
               });
            }
         })
         .catch((error) => {
            toast({
               variant: "destructive",
               title: "Chyba",
               description: `Server není dostupný.`,
            });
         });

      setLoading(false);
      dialogUpdate(false);
   }

   function dialogUpdate(open: boolean) {
      setLoading(false);
      setOpen(open);
      form.reset();
   }

   return (
      <Dialog open={isOpen} onOpenChange={dialogUpdate}>
         <DialogTrigger asChild>
            <Button variant="default" onClick={() => dialogUpdate(true)}>
               <Plus />
               Přidat zařízení
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle>Přidat zařízení</DialogTitle>
            </DialogHeader>
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                  <FormField
                     control={form.control}
                     name="name"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Název zařízení</FormLabel>
                           <FormControl>
                              <Input placeholder="Papago Karel" {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="location"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Umístění zařízení</FormLabel>
                           <FormControl>
                              <Input placeholder="K345" {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="mac"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>MAC adresa</FormLabel>
                           <FormControl>
                              <Input placeholder="AA:BB:CC:DD:EE:FF" {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="ipAddress"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>IP adresa</FormLabel>
                           <FormControl>
                              <div className="flex w-full max-w-sm items-center space-x-2">
                                 <Input placeholder="10.41.20.10" {...field} />
                                 <DeviceConnectionTest ipAddress={form.getValues("ipAddress")} />
                              </div>
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  {isLoading ? (
                     <Button className="w-full mt-4" disabled>
                        <Loader2 className="animate-spin" />
                        Ukládání
                     </Button>
                  ) : (
                     <Button className="w-full mt-4" type="submit">
                        Uložit
                     </Button>
                  )}
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   );
}
