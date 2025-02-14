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

// Get Device By Id
export const getDeviceByIdSchema = z.object({
   id: z.number(),
});
export type GetDeviceByIdType = z.infer<typeof getDeviceByIdSchema>;
