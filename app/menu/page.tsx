"use client";

import { createContext, useContext, useState } from "react";
import Image from "next/image";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import menuRaw from "./menu.json";
import { Textarea } from "@/components/ui/textarea";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "makanan" | "minuman";
}

interface CartItem {
  id: number;
  menu: MenuItem;
  qty: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (addedMenu: MenuItem, qty: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartState>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

function formatCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
}

function MenuCategory(props: { title: string; menu: MenuItem[] }) {
  return (
    <div>
      <h2 className="capitalize text-3xl font-semibold mb-6">{props.title}</h2>
      <MenuList menu={props.menu} />
    </div>
  );
}

function MenuList(props: { menu: MenuItem[] }) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {props.menu.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </ul>
  );
}

function AddToCart(props: { item: MenuItem }) {
  const [qty, setQty] = useState(1);
  const [notes, setNotes] = useState("");

  const { addToCart } = useContext(CartContext);

  function clickHandler() {
    setQty(1);
    setNotes("");

    addToCart(props.item, qty);
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

function MenuItem(props: { item: MenuItem }) {
  return (
    <li className="bg-white rounded-md p-4 flex items-start gap-4 shadow">
      <Image
        src={props.item.image}
        width={120}
        height={120}
        alt={props.item.name}
        className="rounded"
      />
      <div className="flex flex-col flex-1 h-full">
        <div className="mb-2">
          <div className="text-lg mb-1">{props.item.name}</div>
          <div className="text-sm text-stone-400">{props.item.description}</div>
        </div>
        <div className="flex justify-between items-end mt-auto">
          <div className="text-lg">{formatCurrency(props.item.price)}</div>
          <AddToCart item={props.item} />
        </div>
      </div>
    </li>
  );
}

function ViewCart() {
  const { cart } = useContext(CartContext);

  if (!cart.length) return null;

  let totalItem = 0;
  let totalPrice = 0;

  cart.forEach((i) => {
    totalItem += i.qty;
    totalPrice += i.qty * i.menu.price;
  });

  return (
    <div className="flex items-center justify-end fixed bottom-0 right-0 left-0 p-4 border border-t-stone-200 bg-white">
      <div className="mr-4">{totalItem} item</div>
      <Button>Lanjutkan - {formatCurrency(totalPrice)}</Button>
    </div>
  );
}

export default function MenuPage() {
  const menu = menuRaw as MenuItem[];
  const [cart, setCart] = useState<CartItem[]>([]);

  function addToCart(addedItem: MenuItem, qty: number) {
    const addedMenu = menu.find((i) => i.id === addedItem.id);

    if (!addedMenu) return;

    setCart((cart) => [
      ...cart,
      {
        id: cart.length + 1,
        menu: addedMenu,
        qty,
      },
    ]);
  }

  function removeFromCart() {}
  function clearCart() {}

  const contextValue = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      <main className="container p-4">
        <div className="flex flex-col items-center p-12">
          <Image
            src="/logo.png"
            alt="am.pm"
            width={140}
            height={140}
            priority={true}
          />
          <h1 className="text-[#EDA94C] text-2xl">am.pm</h1>
        </div>
        <div className="flex flex-col gap-16">
          <MenuCategory
            title="Makanan"
            menu={menu.filter((i) => i.category === "makanan")}
          />
          <MenuCategory
            title="Minuman"
            menu={menu.filter((i) => i.category === "minuman")}
          />
        </div>
        <ViewCart />
      </main>
    </CartContext.Provider>
  );
}
