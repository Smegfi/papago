import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trash } from "lucide-react";

interface Device{
   title: string;

}

export function DeleteDeviceDialog({...props}) {
   const { title } = props;
   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button variant={"ghost"} size={"icon"} className="text-red-500">
               <Trash />
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle>Opravdu smazat zařízení?</DialogTitle>
               <DialogDescription>{title}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
               <Button type="submit">Ano</Button>
               <Button type="button">Ne</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
