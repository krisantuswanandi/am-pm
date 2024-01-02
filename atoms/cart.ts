import { atomWithStorage } from "jotai/utils";
import { z } from "zod";
import { cartItemSchema } from "@/types";

const cartSchema = z.object({
  version: z.literal(1),
  items: z.record(cartItemSchema).nullable(),
});

type CartState = z.infer<typeof cartSchema>;

export const cartAtom = atomWithStorage<CartState>(
  "cart",
  {
    version: 1,
    items: null,
  },
  {
    getItem(key) {
      try {
        const savedCartRaw = localStorage.getItem(key);
        const savedCart = JSON.parse(savedCartRaw || "");

        const cart = cartSchema.safeParse(savedCart);

        if (cart.success) {
          return cart.data;
        }
      } catch {}

      return {
        version: 1 as const,
        items: null,
      };
    },
    setItem(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    removeItem(key) {
      localStorage.removeItem(key);
    },
  },
);
