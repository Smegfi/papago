"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Trash } from "lucide-react";
import { deleteDeviceSchema, DeleteDeviceType } from "@/server/types";
import { deleteDeviceAction, getDeviceByIdAction } from "@/server/actions";
import { useAction } from "next-safe-action/hooks";

export function RemoveDeviceDialog({ deviceId }: { deviceId: number }) {
   const [isOpen, setOpen] = useState(false);
   const { execute } = useAction(deleteDeviceAction, {
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
   const form = useForm<DeleteDeviceType>({
      resolver: zodResolver(deleteDeviceSchema),
      defaultValues: {
         id: deviceId,
         name: "",
         ipAddress: "",
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
               ipAddress: device.ipAddress,
            });
         }
      }
      setOpen(open);
   }

   function onFormSubmit(values: DeleteDeviceType) {
      execute(values);
      dialogUpdate(false);
   }

   return (
      <Dialog open={isOpen} onOpenChange={dialogUpdate}>
         <DialogTrigger asChild>
            <Button variant="ghost" onClick={() => dialogUpdate(true)}>
               <Trash className="text-red-500" />
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle>Smazat zařízení?</DialogTitle>
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
                              <Input {...field} disabled />
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
                                 <Input placeholder="10.41.20.10" {...field} disabled />
                              </div>
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <div className="flex justify-end gap-2">
                     <Button type="submit" variant="destructive" className="w-1/3">
                        Ano smazat
                     </Button>
                     <Button type="button" onClick={() => dialogUpdate(false)} className="w-1/3">
                        Ne ponechat
                     </Button>
                  </div>
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   );
}
