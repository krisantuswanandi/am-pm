import { z } from "zod";

export const menuItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  image: z.string(),
  category: z.enum(["makanan", "minuman", "tambahan"]),
});

export type MenuItem = z.infer<typeof menuItemSchema>;

export const cartItemSchema = z.object({
  id: z.number(),
  menu: menuItemSchema,
  qty: z.number(),
  notes: z.string(),
});

export type CartItem = z.infer<typeof cartItemSchema>;

export const orderPayloadSchema = z.object({
  name: z.string(),
  address: z.string(),
  items: z.array(cartItemSchema),
});

export type OrderPayload = z.infer<typeof orderPayloadSchema>;
