"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Loader2, Pen } from "lucide-react";
import { updateDeviceAction } from "@/server/actions";
import { Device, DeviceSchema } from "@/server/types";
import { Switch } from "@/components/ui/switch";

export function EditDeviceDialog({ item }: { item: Device }) {
   const [isOpen, setOpen] = useState(false);
   const [isLoading, setLoading] = useState(false);

   const form = useForm<Device>({
      resolver: zodResolver(DeviceSchema),
      defaultValues: {
         name: item.name,
         location: item.location,
         mac: item.mac,
         ipAddress: item.ipAddress,
         isEnabled: item.isEnabled,
      },
      mode: "onChange",
      reValidateMode: "onChange",
      delayError: 200,
   });

   function onSubmit(data: Device) {
      setLoading(true);

      updateDeviceAction(data)
         .then((result) => {
            if (result.status == 200) {
               toast({
                  title: "Vytvořeno",
                  description: result.message,
               });
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
            <Button variant={"ghost"} size={"icon"} onClick={() => dialogUpdate(true)}>
               <Pen />
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
                              </div>
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="isEnabled"
                     render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                           <div className="space-y-0.5">
                              <FormLabel className="text-sm font-semibold">Povolit</FormLabel>
                              <FormDescription className="text-xs">Pokud je zařízení zapnuté bude průběžně stahovat data</FormDescription>
                           </div>
                           <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
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
