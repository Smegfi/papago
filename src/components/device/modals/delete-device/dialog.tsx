"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Trash } from "lucide-react";
import { useState } from "react";
import { removeDeviceAction } from "@/server/actions";
import { Device } from "@/server/types";
import { toast } from "@/hooks/use-toast";

export function DeleteDeviceDialog({ device, removeDevice }: { device: Device; removeDevice: (device: Device) => void }) {
   const [isOpen, setOpen] = useState<boolean>(false);
   const [isLoading, setLoading] = useState<boolean>(false);

   function handleSubmit() {
      setLoading(true);
      removeDeviceAction(device.id)
         .then((result) => {
            if (result.status === 200) {
               removeDevice(device);
               setLoading(false);
               setOpen(false);
               toast({
                  title: "Smazáno",
                  description: `${result.message}`,
               });
            } else {
               toast({
                  variant: "destructive",
                  title: "Chyba",
                  description: `${result.message}`,
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
   }

   function handleDialogOpen(open: boolean) {
      setOpen(open);
      setLoading(false);
   }

   return (
      <Dialog open={isOpen} onOpenChange={handleDialogOpen}>
         <DialogTrigger asChild>
            <Button variant={"ghost"} size={"icon"} className="text-red-500">
               <Trash />
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle>Opravdu smazat zařízení?</DialogTitle>
               <DialogDescription>Smažou se veškterá data, které zařízení načetlo. Tato akce je nevratná</DialogDescription>
            </DialogHeader>
            <div>
               <Label>Název</Label>
               <Input value={device.name} disabled />
            </div>
            <div>
               <Label>Umístění zařízení</Label>
               <Input value={device.location} disabled />
            </div>
            <div>
               <Label>IP adresa </Label>
               <Input value={device.ipAddress} disabled />
            </div>
            <DialogFooter>
               {isLoading ? (
                  <Button variant={"destructive"} onClick={handleSubmit}>
                     <Loader2 className="animate-spin" />
                     Ano
                  </Button>
               ) : (
                  <Button variant={"destructive"} onClick={handleSubmit}>
                     Ano
                  </Button>
               )}
               <Button type="button" onClick={() => handleDialogOpen(false)}>
                  Ne
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
