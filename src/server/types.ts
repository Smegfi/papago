import { z } from "zod";

const MacRegex = /^([A-Fa-f0-9]{2}:){5}([A-Fa-f0-9]{2})$|([A-Fa-f0-9]{12})$/;

// Create Device
export const createDeviceSchema = z.object({
   name: z.string().min(1, { message: "Název je povinný" }),
   location: z.string().min(1, { message: "Umístění je povinné" }),
   mac: z.string({required_error: "MAC adresa je povinná"}).regex(MacRegex, { message: "MAC adresa není ve správném formátu" }),
   ipAddress: z.string({required_error: "IP adresa je povinná"}).ip({ message: "IP adresa není ve správném formátu" }),
   isEnabled: z.boolean(),
});
export type CreateDeviceType = z.infer<typeof createDeviceSchema>;

// Edit Device
export const editDeviceSchema = z.object({
   id: z.number(),
   name: z.string().min(1, { message: "Název je povinný" }),
   location: z.string().min(1, { message: "Umístění je povinné" }),
   mac: z.string({required_error: "MAC adresa je povinná"}).regex(MacRegex, { message: "MAC adresa není ve správném formátu" }),
   ipAddress: z.string({required_error: "IP adresa je povinná"}).ip({ message: "IP adresa není ve správném formátu" }),
   isEnabled: z.boolean(),
});
export type EditDeviceType = z.infer<typeof editDeviceSchema>;

// Get Device By Id
export const getDeviceByIdSchema = z.object({
   id: z.number(),
});
export type GetDeviceByIdType = z.infer<typeof getDeviceByIdSchema>;

// Delete Device
export const deleteDeviceSchema = z.object({
   id: z.number(),
   name: z.string().min(1, { message: "Název je povinný" }),
   ipAddress: z.string({required_error: "IP adresa je povinná"}).ip({ message: "IP adresa není ve správném formátu" }),
});
export type DeleteDeviceType = z.infer<typeof deleteDeviceSchema>;

// Test Connection
export const testConnectionSchema = z.object({
   ipAddress: z.string({required_error: "IP adresa je povinná"}).ip({ message: "IP adresa není ve správném formátu" }),
});
export type TestConnectionType = z.infer<typeof testConnectionSchema>;

// Get Measuring By Device Id
export const getMeasuringByDeviceIdSchema = z.object({
   deviceId: z.number(),
});
export type GetMeasuringByDeviceIdType = z.infer<typeof getMeasuringByDeviceIdSchema>;

// Get Measuring Values By Device
export const getMeasuringValuesByDeviceSchema = z.object({
   deviceId: z.number(),
});
export type GetMeasuringValuesByDeviceType = z.infer<typeof getMeasuringValuesByDeviceSchema>;




