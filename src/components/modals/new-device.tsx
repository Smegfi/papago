import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { createDeviceAction } from "@/server/actions";
import { Device } from "@/server/types";
import { useRouter } from "next/navigation";

export function NewDeviceDialog() {
   const [isOpen, setOpen] = useState(false);
   const [name, setName] = useState("");
   const [location, setLocation] = useState("");
   const [mac, setMac] = useState("");
   const [ipAddress, setIpAddress] = useState("");
   const router = useRouter();

   async function handleDialogSubmit() {
      let device: Device = {
         id: 0,
         name: name,
         location: location,
         mac: mac,
         ipAddress: ipAddress,
      };
      await createDeviceAction(device);
      router.refresh();
      dialogUpdate();
   }

   function dialogUpdate() {
      const foo = isOpen;
      setOpen(!foo);
   }

   return (
      <Dialog open={isOpen}>
         <DialogTrigger asChild>
            <Button variant="default" onClick={dialogUpdate}>
               Přidat zařízení
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle>Přidat zařízení</DialogTitle>
               <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
               <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                     Název
                  </Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                     Umístění
                  </Label>
                  <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="col-span-3" />
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="mac" className="text-right">
                     Mac adresa
                  </Label>
                  <Input id="mac" value={mac} onChange={(e) => setMac(e.target.value)} className="col-span-3" />
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="ipAddress" className="text-right">
                     IP Adresa
                  </Label>
                  <Input id="ipAddress" value={ipAddress} onChange={(e) => setIpAddress(e.target.value)} className="col-span-3" />
               </div>
            </div>
            <DialogFooter>
               <Button type="submit" onClick={handleDialogSubmit}>
                  Uložit
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
