import { z } from "zod";

export const menuItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.number(),
  image: z.string().nullable(),
  categoryId: z.number(),
  order: z.number(),
});

export type MenuItem = z.infer<typeof menuItemSchema>;

export const cartItemSchema = z.object({
  id: z.number(),
  menu: menuItemSchema,
  qty: z.number(),
  notes: z.string(),
});

export type CartItem = z.infer<typeof cartItemSchema>;

export const contactSchema = z.object({
  name: z.string(),
  address: z.string(),
});

export type Contact = z.infer<typeof contactSchema>;

export const orderPayloadSchema = z.object({
  name: z.string(),
  address: z.string(),
  items: z.array(cartItemSchema),
});

export type OrderPayload = z.infer<typeof orderPayloadSchema>;
