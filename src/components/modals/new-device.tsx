import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

interface Device {
   name: string;
   type: string;
   location: string;
   ipAddress: string;
}

export function NewDeviceDialog({ ...props }) {
   const { addDeviceFunc } = props;
   const [dialogOpen, setDialogOpen] = useState(false);
   const [selectValue, setSelectValue] = useState("");

   const [device, setDevice] = useState<Device>({ name: "", type: "", location: "", ipAddress: "" });

   function handleDialogSubmit() {
      updateDialog();
      addDeviceFunc(device.name, selectValue, device.location, device.ipAddress);
   }

   function updateDialog() {
      const currentStatus = dialogOpen;
      setDialogOpen(!currentStatus);
   }

   function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
      setDevice({ ...device, [e.target.id]: e.target.value });
   }
   return (
      <Dialog open={dialogOpen} onOpenChange={updateDialog}>
         <DialogTrigger asChild>
            <Button onClick={() => setDialogOpen(true)} variant="default">
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
                  <Input id="name" value={device.name} onChange={handleFormChange} className="col-span-3" />
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                     Typ
                  </Label>
                  <Select value={selectValue} onValueChange={setSelectValue}>
                     <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Zvol typ zařízení" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectGroup>
                           <SelectLabel>Typ</SelectLabel>
                           <SelectItem value="Teploměr">Teploměr</SelectItem>
                           <SelectItem value="Server">Server</SelectItem>
                           <SelectItem value="Switch">Switch</SelectItem>
                        </SelectGroup>
                     </SelectContent>
                  </Select>
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                     Umístění
                  </Label>
                  <Input id="location" value={device.location} onChange={handleFormChange} className="col-span-3" />
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="ipAddress" className="text-right">
                     IP Adresa
                  </Label>
                  <Input id="ipAddress" value={device.ipAddress} onChange={handleFormChange} className="col-span-3" />
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
