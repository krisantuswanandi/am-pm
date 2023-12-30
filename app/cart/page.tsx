"use client";

import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import { cartAtom } from "@/atoms/cart";
import { formatCurrency, sendWhatsapp } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function CartPage() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const [cart] = useAtom(cartAtom);

  const total = cart.reduce((acc, i) => {
    return acc + i.menu.price * i.qty;
  }, 0);

  function submitHandler() {
    sendWhatsapp({
      name,
      address,
      items: cart,
    });
  }

  return (
    <div className="flex justify-center m-auto px-5 sm:py-12 py-4">
      <div className="w-full sm:max-w-md bg-white shadow rounded-md">
        <div className="border-b border-stone-200 px-4 sm:px-8 pt-8 pb-12">
          <div className="text-xl font-semibold">Tujuan</div>
          <div className="mt-4">
            <div className="font-semibold">Nama</div>
            <div className="mt-1">
              <Input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="mt-4">
            <div className="font-semibold">Alamat</div>
            <div className="mt-1">
              <Textarea
                className="h-20"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="mt-3 flex justify-between">
            <div className="font-semibold">Total</div>
            <div className="text-lg font-semibold">{formatCurrency(total)}</div>
          </div>
          <div className="mt-2 flex flex-col-reverse gap-2">
            <Button
              className="flex-1"
              onClick={submitHandler}
              disabled={!name || !address}
            >
              Pesan
            </Button>
          </div>
        </div>
        <div className="px-4 sm:px-8 py-8">
          <div className="flex justify-between">
            <div className="text-xl font-semibold">Rincian</div>
            <Button variant="link" className="p-0 text-amber-500">
              <Link href="/order">Ubah Pesanan</Link>
            </Button>
          </div>
          <div className="flex flex-col gap-4 mt-2">
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
        </div>
      </div>
    </div>
  );
}
