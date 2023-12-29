"use client";

import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import { cartAtom } from "@/atoms/cart";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const [cart] = useAtom(cartAtom);

  const total = cart.reduce((acc, i) => {
    return acc + i.menu.price * i.qty;
  }, 0);

  return (
    <div className="flex justify-center m-auto p-12">
      <div className="w-full max-w-md bg-white p-4 shadow rounded-md">
        <div className="text-xl font-semibold mb-8">Konfirmasi Pesanan</div>
        <div className="flex flex-col gap-4">
          {cart.map((i) => {
            return (
              <div key={i.id} className="flex justify-between text-md gap-2">
                <div className="flex gap-2 items-start">
                  <Image
                    src={i.menu.image}
                    alt={i.menu.name}
                    width={60}
                    height={60}
                    className="rounded"
                  />
                  <div>
                    <div>
                      {i.qty} {i.menu.name}
                    </div>
                    <div className="text-stone-400 text-sm">{i.notes}</div>
                  </div>
                </div>
                <div className="font-semibold">
                  {formatCurrency(i.menu.price * i.qty)}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between text-xl mt-8">
          <div>Total harga:</div>
          <div className="font-semibold">{formatCurrency(total)}</div>
        </div>
        <div className="mt-2 flex flex-col-reverse gap-2">
          <Button variant="outline">
            <Link href="/order">Ubah Pesanan</Link>
          </Button>
          <Button className="flex-1">Pesan</Button>
        </div>
      </div>
    </div>
  );
}
