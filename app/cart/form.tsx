"use client";

import { useAtom } from "jotai";
import { RESET } from "jotai/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cartAtom } from "@/atoms/cart";
import { contactAtom } from "@/atoms/contact";
import { formatCurrency, sendWhatsapp } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { ConfirmationModal } from "./confirmation";
import { ThankYouModal } from "./thank-you";
import type { CartItem, OrderPayload, Contact } from "@/types";

function SuggestionButton(props: {
  isActive: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={props.onClick}
      className={`rounded-full px-3 py-1.5 text-xs ${
        props.isActive
          ? "bg-neutral-300 text-neutral-800"
          : "bg-neutral-200/70 text-neutral-500/70"
      }`}
    >
      {props.children}
    </button>
  );
}

function OrderForm(props: {
  items: CartItem[];
  savedContact: Contact;
  onSubmit: (order: OrderPayload, savedContact?: Contact) => void;
}) {
  const [name, setName] = useState(props.savedContact.name);
  const [address, setAddress] = useState(props.savedContact.address);
  const [isSaveContact, setIsSaveContact] = useState(false);

  const suggestions = ["Makan di tempat", "Ambil di tempat"];

  const total = props.items.reduce((acc, i) => {
    return acc + i.menu.price * i.qty;
  }, 0);

  function submitOrder() {
    props.onSubmit(
      {
        name,
        address,
        items: props.items,
      },
      isSaveContact
        ? {
            name,
            address: suggestions
              .map((s) => s.toLowerCase())
              .includes(address.trim().toLowerCase())
              ? ""
              : address,
          }
        : undefined,
    );
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
                className="h-24 resize-none"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="mt-2 flex gap-2">
            {suggestions.map((suggestion) => {
              return (
                <SuggestionButton
                  isActive={address.toLowerCase() === suggestion.toLowerCase()}
                  key={suggestion}
                  onClick={() => {
                    setAddress(suggestion);
                  }}
                >
                  {suggestion}
                </SuggestionButton>
              );
            })}
          </div>
          <div className="mt-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="save-contact"
                checked={isSaveContact}
                onCheckedChange={(val: boolean) => {
                  setIsSaveContact(val);
                }}
                className="border-stone-300 data-[state=checked]:border-amber-500"
              />
              <label htmlFor="save-contact">Simpan kontak</label>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="font-semibold">Total</div>
            <div className="text-lg font-semibold">{formatCurrency(total)}</div>
          </div>
          <div className="mt-2 flex flex-col-reverse gap-2">
            <ConfirmationModal
              disabled={!name || !address}
              onContinue={submitOrder}
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
            {props.items.map((i) => {
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

export function CartForm(props: { onSubmit(payload: OrderPayload): void }) {
  const [completed, setCompleted] = useState(false);
  const [cart, setCart] = useAtom(cartAtom);
  const [contact, setContact] = useAtom(contactAtom);

  function onSubmit(payload: OrderPayload, savedContact?: Contact) {
    setCompleted(true);
    sendWhatsapp(payload);
    props.onSubmit(payload);
    setCart(RESET);

    if (savedContact) {
      setContact({
        ...contact,
        data: savedContact,
      });
    }
  }

  const items = cart.items ? Object.values(cart.items) : [];

  return (
    <>
      <ThankYouModal open={completed} />
      {items.length ? (
        <OrderForm
          items={items}
          savedContact={contact.data}
          onSubmit={onSubmit}
        />
      ) : (
        <EmptyCart />
      )}
    </>
  );
}
