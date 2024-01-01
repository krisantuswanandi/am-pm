"use client";

import Image from "next/image";
import Link from "next/link";
import { useAtom } from "jotai";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
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

const instagram = process.env.NEXT_PUBLIC_INSTAGRAM;
const whatsapp = process.env.NEXT_PUBLIC_PHONE_NUMBER;

export default function MenuPage() {
  const [menu] = useAtom(menuAtom);

  const categories = ["makanan", "minuman", "tambahan"];

  return (
    <main className="container p-4">
      <Link href="/" className="flex flex-col items-center p-12">
        <Image
          src="/logo.png"
          alt="am.pm"
          width={140}
          height={140}
          priority={true}
        />
        <h1 className="text-2xl text-[#EDA94C]">am.pm</h1>
      </Link>
      <div className="flex flex-col gap-16">
        {categories.map((category) => (
          <MenuCategory
            key={category}
            title={category}
            menu={menu.filter((i) => i.category === category)}
          />
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-4 py-4 text-stone-400">
        <a
          href={`https://instagram.com/${instagram}`}
          target="_blank"
          className="flex items-center gap-1 p-2"
        >
          <FaInstagram size="1.4em" />
          <span className="text-sm">@{instagram}</span>
        </a>
        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          className="flex items-center gap-1 p-2"
        >
          <FaWhatsapp size="1.4em" />
          <span className="text-sm">+{whatsapp}</span>
        </a>
      </div>
      <ViewCart />
    </main>
  );
}
