"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { createDeviceSchema, CreateDeviceType } from "@/server/types";
import { createDeviceAction } from "@/server/actions";
import { useAction } from "next-safe-action/hooks";
import { toast } from "@/hooks/use-toast";

export function CreateDeviceDialog() {
   const [isOpen, setOpen] = useState(false);
   const {execute} = useAction(createDeviceAction, {
      onSuccess: () => {
         console.log("success...");
      },
      onError: (errors) => {
         console.log("error...", errors);
      },
      onExecute: (data) => {
         console.log("executing...", data);
      }
   });
   const form = useForm<CreateDeviceType>({
      resolver: zodResolver(createDeviceSchema),
      defaultValues: {
         name: "",
         location: "",
         mac: "",
         ipAddress: "",
         isEnabled: false,
      }
   });

   function dialogUpdate(open: boolean) {
      setOpen(open);
      form.reset();
   }

   function onFormSubmit(values: CreateDeviceType) {
      console.log(values);
      execute(values);
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
                  <Button className="w-full mt-4" type="submit" onClick={() => onFormSubmit(form.getValues())}>
                     Uložit
                  </Button>
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   );
}
