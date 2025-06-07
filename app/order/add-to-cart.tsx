"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useAtom } from "jotai";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import { cartAtom } from "@/atoms/cart";
import { formatCurrency } from "@/lib/utils";
import type { MenuItem } from "@/types";

export function AddToCart(props: { item: MenuItem }) {
  const [qty, setQty] = useState(1);
  const [notes, setNotes] = useState("");
  const [dadidu, setDadidu] = useState(0);

  const [cart, setCart] = useAtom(cartAtom);
  useEffect(() => {
    const currentItem = cart.items?.[props.item.id];
    if (currentItem) {
      setQty(currentItem.qty);
      setNotes(currentItem.notes);
      setDadidu(currentItem.qty);
    }
  }, [cart, props.item.id]);

  function clickHandler() {
    if (qty <= 0) {
      setQty(1);
      setNotes("");
      setDadidu(0);

      setCart((state) => {
        if (!state.items) {
          return state;
        }

        const { [props.item.id]: _, ...rest } = state.items;
        return { ...state, items: rest };
      });
    } else {
      setCart((state) => ({
        ...state,
        items: {
          ...state.items,
          [props.item.id]: { id: props.item.id, menu: props.item, qty, notes },
        },
      }));
    }
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          className="rounded-full border-2 border-amber-500 text-lg"
          variant={dadidu ? "outline" : "default"}
          size="icon"
        >
          {dadidu ? dadidu : <FaPlus className="h-4 w-4" />}
          <span className="sr-only">Pesan</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="sr-only">
          <DrawerTitle>{props.item.name}</DrawerTitle>
          <DrawerDescription>{props.item.description}</DrawerDescription>
        </DrawerHeader>
        <div className="mx-auto w-full max-w-md">
          <div className="p-4">
            <div className="flex gap-4">
              {props.item.image ? (
                <Image
                  src={props.item.image}
                  width={120}
                  height={120}
                  alt={props.item.name}
                  className="rounded"
                />
              ) : (
                <div className="h-[120px] w-[120px] rounded bg-stone-200"></div>
              )}
              <div className="flex flex-col gap-2">
                <div className="text-lg">{props.item.name}</div>
                <div className="text-sm text-stone-400">
                  {props.item.description}
                </div>

                <div className="text-lg font-semibold">
                  {formatCurrency(props.item.price)}
                </div>
              </div>
            </div>
            <div className="mt-8">
              <div className="mb-2 font-semibold">Catatan</div>
              <Textarea
                className="h-32 resize-none placeholder:text-stone-300 placeholder:italic"
                placeholder="Contoh: tidak pedas, tanpa acar, dll."
                value={notes}
                onChange={(e) => {
                  setNotes(e.target.value);
                }}
              />
            </div>
            <div className="flex items-center justify-center gap-4 pt-14 pb-6">
              <Button
                variant="outline"
                size="icon"
                disabled={qty <= 0}
                className="h-8 w-8 shrink-0 rounded-full border-amber-500"
                onClick={() => setQty((qty) => qty - 1)}
              >
                <FaMinus className="h-4 w-4 fill-amber-500" />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="w-16 text-center text-3xl font-bold">{qty}</div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full border-amber-500"
                onClick={() => setQty((qty) => qty + 1)}
              >
                <FaPlus className="h-4 w-4 fill-amber-500" />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
          </div>
          <DrawerFooter className="flex-row-reverse">
            <DrawerClose asChild>
              <Button className="flex-1" onClick={clickHandler}>
                {qty > 0
                  ? `Tambahkan - ${formatCurrency(props.item.price * qty)}`
                  : "Batalkan"}
              </Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button variant="outline">Tutup</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
