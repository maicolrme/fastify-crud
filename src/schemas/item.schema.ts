import { z } from "zod";

export const createItemSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  description: z.string().max(1000).optional(),
  price: z.number().positive("Price must be positive"),
  userId: z.number().int().positive().optional(),
});

export const updateItemSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  description: z.string().max(1000).optional(),
  price: z.number().positive("Price must be positive").optional(),
  userId: z.number().int().positive().optional(),
});

export const itemIdParamsSchema = z.object({
  id: z.coerce.number().positive(),
});

export type CreateItemInput = z.infer<typeof createItemSchema>;
export type UpdateItemInput = z.infer<typeof updateItemSchema>;
