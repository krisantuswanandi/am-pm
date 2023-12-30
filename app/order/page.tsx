"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import { cartAtom } from "@/atoms/cart";
import { menuAtom } from "@/atoms/menu";
import { formatCurrency } from "@/lib/utils";
import { MenuCategory } from "./menu";

function ViewCart() {
  const [cart] = useAtom(cartAtom);

  if (!cart.length) return null;

  let totalItem = 0;
  let totalPrice = 0;

  cart.forEach((i) => {
    totalItem += i.qty;
    totalPrice += i.qty * i.menu.price;
  });

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

export default function MenuPage() {
  const [menu] = useAtom(menuAtom);

  const categories = ["makanan", "minuman", "tambahan"];

  return (
    <main className="container p-4">
      <div className="flex flex-col items-center p-12">
        <Image
          src="/logo.png"
          alt="am.pm"
          width={140}
          height={140}
          priority={true}
        />
        <h1 className="text-2xl text-[#EDA94C]">am.pm</h1>
      </div>
      <div className="flex flex-col gap-16">
        {categories.map((category) => (
          <MenuCategory
            key={category}
            title={category}
            menu={menu.filter((i) => i.category === category)}
          />
        ))}
      </div>
      <ViewCart />
    </main>
  );
}
