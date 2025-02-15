"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Pencil } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { editDeviceSchema, EditDeviceType } from "@/server/types";
import { editDeviceAction, getDeviceByIdAction } from "@/server/actions";
import { useAction } from "next-safe-action/hooks";

export function EditDeviceDialog({ deviceId }: { deviceId: number }) {
   const [isOpen, setOpen] = useState(false);
   const { execute } = useAction(editDeviceAction, {
      onSuccess: () => {
         console.log("success...");
      },
      onError: (errors) => {
         console.log("error...", errors);
      },
      onExecute: (data) => {
         console.log("executing...", data);
      },
   });
   const form = useForm<EditDeviceType>({
      resolver: zodResolver(editDeviceSchema),
      defaultValues: {
         name: "",
         location: "",
         mac: "",
         ipAddress: "",
         isEnabled: false,
      },
   });

   async function dialogUpdate(open: boolean) {
      if (open) {
         const result = await getDeviceByIdAction({ id: deviceId });
         if (result?.data) {
            const device = result!.data;
            form.reset({
               id: device.id,
               name: device.name,
               location: device.location,
               mac: device.mac,
               ipAddress: device.ipAddress,
               isEnabled: device.isEnabled ?? false
            });
         }
      }
      setOpen(open);
   }

   function onFormSubmit(values: EditDeviceType) {
      execute(values);
      dialogUpdate(false);
   }

   return (
      <Dialog open={isOpen} onOpenChange={dialogUpdate}>
         <DialogTrigger asChild>
            <Button variant="ghost" onClick={() => dialogUpdate(true)}>
               <Pencil />
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle>Upravit zařízení</DialogTitle>
            </DialogHeader>
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onFormSubmit)} className="w-full space-y-4">
                  <FormField
                     control={form.control}
                     name="name"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Název zařízení</FormLabel>
                           <FormControl>
                              <Input {...field} />
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
                              <Input {...field} />
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
                  <Button className="w-full mt-4" type="submit">
                     Uložit
                  </Button>
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   );
}
