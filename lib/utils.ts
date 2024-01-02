import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CartItem } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
}

export function sendWhatsapp(data: {
  name: string;
  address: string;
  items: CartItem[];
}) {
  const number = process.env.NEXT_PUBLIC_PHONE_NUMBER;
  const message = `*Nama:* ${data.name}
*Alamat:*${
    data.address.includes("\n") ? `\n${data.address}` : ` ${data.address}`
  }

*Pesanan:*
${data.items
  .map(
    (item) =>
      `*${item.qty}* ${item.menu.name}${item.notes ? ` (${item.notes})` : ""}`,
  )
  .join("\n")}`;

  window.open(`https://wa.me/${number}?text=${encodeURI(message)}`, "_blank");
}
