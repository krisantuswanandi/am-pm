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
import { ConfirmationModal } from "./confirmation";
import { ThankYouModal } from "./thank-you";

function OrderForm(props: { cart: CartItem[]; onComplete: () => void }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const total = props.cart.reduce((acc, i) => {
    return acc + i.menu.price * i.qty;
  }, 0);

  function submitHandler() {
    sendWhatsapp({
      name,
      address,
      items: props.cart,
    });
    props.onComplete();
  }

  return (
    <div className="m-auto flex justify-center px-5 py-4 sm:py-12">
      <div className="w-full rounded-md bg-white shadow sm:max-w-md">
        <div className="border-b border-stone-200 px-4 pb-12 pt-8 sm:px-8">
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
            <ConfirmationModal
              disabled={!name || !address}
              onContinue={submitHandler}
            />
          </div>
        </div>
        <div className="px-4 py-8 sm:px-8">
          <div className="flex justify-between">
            <div className="text-xl font-semibold">Rincian</div>
            <Button variant="link" className="p-0 text-amber-500">
              <Link href="/order">Ubah Pesanan</Link>
            </Button>
          </div>
          <div className="mt-2 flex flex-col gap-4">
            {props.cart.map((i) => {
              return (
                <div key={i.id} className="text-md flex justify-between gap-2">
                  <div className="flex items-start gap-2">
                    {i.menu.image ? (
                      <Image
                        src={i.menu.image}
                        alt={i.menu.name}
                        width={60}
                        height={60}
                        className="rounded"
                      />
                    ) : (
                      <div className="h-[60px] w-[60px] rounded bg-stone-200"></div>
                    )}
                    <div>
                      <div>
                        {i.qty} {i.menu.name}
                      </div>
                      <div className="text-sm text-stone-400">{i.notes}</div>
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

function EmptyCart() {
  return (
    <div className="flex h-dvh items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="text-4xl font-semibold text-stone-300">
          Belum ada pesanan
        </div>
        <div className="mt-10">
          <Button asChild>
            <Link href="/order">Pesan Sekarang</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  const [completed, setCompleted] = useState(false);
  const [cart, setCart] = useAtom(cartAtom);

  function onComplete() {
    setCompleted(true);
    setCart([]);
  }

  return (
    <>
      <ThankYouModal open={completed} />
      {cart.length ? (
        <OrderForm cart={cart} onComplete={onComplete} />
      ) : (
        <EmptyCart />
      )}
    </>
  );
}
