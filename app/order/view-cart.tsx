"use client";

import Link from "next/link";
import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import { cartAtom } from "@/atoms/cart";
import { formatCurrency } from "@/lib/utils";

export function ViewCart() {
  const [cart] = useAtom(cartAtom);

  if (!cart.items) return null;

  let totalItem = 0;
  let totalPrice = 0;

  Object.values(cart.items).forEach((item) => {
    totalItem += item.qty;
    totalPrice += item.qty * item.menu.price;
  });

  if (!totalItem) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 flex items-center justify-end border border-t-stone-200 bg-white p-4">
      <div className="mr-4">
        Total: {formatCurrency(totalPrice)} ({totalItem} item)
      </div>
      <Button asChild>
        <Link href="/cart">Lanjutkan</Link>
      </Button>
    </div>
  );
}
