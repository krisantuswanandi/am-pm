import { atom } from "jotai";

const initialValue = JSON.parse(
  localStorage.getItem("cart") || "[]"
) as CartItem[];

export const cartAtom = atom<CartItem[]>(initialValue);
