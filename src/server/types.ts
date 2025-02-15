import { z } from "zod";

// Create Device
export const createDeviceSchema = z.object({
   name: z.string().min(1),
   location: z.string().min(1),
   mac: z.string().min(1),
   ipAddress: z.string().ip(),
   isEnabled: z.boolean(),
});
export type CreateDeviceType = z.infer<typeof createDeviceSchema>;

// Edit Device
export const editDeviceSchema = z.object({
   id: z.number(),
   name: z.string().min(1),
   location: z.string().min(1),
   mac: z.string().min(1),
   ipAddress: z.string().ip(),
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
   name: z.string().min(1),
   ipAddress: z.string().ip(),
});
export type DeleteDeviceType = z.infer<typeof deleteDeviceSchema>;

// Test Connection
export const testConnectionSchema = z.object({
   ipAddress: z.string().ip(),
});
export type TestConnectionType = z.infer<typeof testConnectionSchema>;
