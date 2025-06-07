"use client";

import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { AddToCart } from "./add-to-cart";
import type { MenuItem } from "@/types";
import type { Category, Menu } from "@/database/schema";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export function MenuCategory(props: { title: string; menu: MenuItem[] }) {
  return (
    <div>
      <h2 className="mb-6 text-3xl font-semibold capitalize">{props.title}</h2>
      <CategorizedMenuList menu={props.menu} />
    </div>
  );
}

export function CategorizedMenuList(props: { menu: MenuItem[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {props.menu
        .sort((a, b) => a.order - b.order)
        .map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
    </ul>
  );
}

export function MenuItem(props: { item: MenuItem }) {
  return (
    <li className="flex items-start gap-4 rounded-md bg-white p-4 shadow-sm">
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
      <div className="flex h-full flex-1 flex-col">
        <div className="mb-2">
          <div className="mb-1 text-lg">{props.item.name}</div>
          <div className="text-sm text-stone-400">{props.item.description}</div>
        </div>
        <div className="mt-auto flex items-end justify-between">
          <div className="text-lg">{formatCurrency(props.item.price)}</div>
          <AddToCart item={props.item} />
        </div>
      </div>
    </li>
  );
}

export function MenuList({
  categories,
  menu,
}: {
  categories: Category[];
  menu: Menu[];
}) {
  const [search, setSearch] = useState("");

  const filteredMenua = menu.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <div>
        <Input
          placeholder="Cari menu..."
          className="bg-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="mt-8 flex flex-col gap-16 empty:py-16 empty:text-center empty:text-stone-400/50 empty:italic empty:before:content-['Menu_tidak_ditemukan']">
        {categories.map((category) => {
          const categorizedMenu = filteredMenua.filter(
            (i) => i.categoryId === category.id,
          );

          if (!categorizedMenu.length) return null;

          return (
            <MenuCategory
              key={category.id}
              title={category.name || ""}
              menu={categorizedMenu}
            />
          );
        })}
      </div>
    </div>
  );
}
