import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { AddToCart } from "./add-to-cart";

export function MenuCategory(props: { title: string; menu: MenuItem[] }) {
  return (
    <div>
      <h2 className="capitalize text-3xl font-semibold mb-6">{props.title}</h2>
      <MenuList menu={props.menu} />
    </div>
  );
}

export function MenuList(props: { menu: MenuItem[] }) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {props.menu.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </ul>
  );
}

export function MenuItem(props: { item: MenuItem }) {
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
