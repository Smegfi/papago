import { z } from "zod";

const MacAddressRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$|^([0-9A-Fa-f]{2}){5}([0-9A-Fa-f]{2})$/;

export const DeviceModal = z.object({
   name: z.string().min(1, { message: "Název zařízení musí být vyplněný" }),
   location: z.string().min(1, { message: "Umístění musí být vyplněné" }),
   mac: z.string().regex(MacAddressRegex, { message: "MAC adresa musí být ve tvaru 00:AA:BB:CC:DD:EE nebo 00AABBCCDDEE" }),
   ipAddress: z.string().ip({ message: "Zadej prosím správnou IP adresu" }),
});

export type DeviceModalType = z.infer<typeof DeviceModal>;
