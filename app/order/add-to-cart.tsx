import { useState } from "react";
import Image from "next/image";
import { useAtom } from "jotai";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import { cartAtom } from "@/atoms/cart";
import { formatCurrency } from "@/lib/utils";

export function AddToCart(props: { item: MenuItem }) {
  const [qty, setQty] = useState(1);
  const [notes, setNotes] = useState("");

  const [_, setCart] = useAtom(cartAtom);

  function clickHandler() {
    setQty(1);
    setNotes("");

    setCart((cart) => {
      return [
        ...cart,
        {
          id: cart.length + 1,
          menu: props.item,
          qty,
          notes,
        },
      ];
    });
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="rounded-full" size="icon">
          <FaPlus className="h-4 w-4" />
          <span className="sr-only">Pesan</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-md">
          <div className="p-4">
            <div className="flex gap-4">
              <Image
                src={props.item.image}
                width={120}
                height={120}
                alt={props.item.name}
                className="rounded"
              />
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
              <div className="font-semibold mb-2">Catatan</div>
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
