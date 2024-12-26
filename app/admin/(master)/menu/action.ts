"use server";

import { addMenu, getMenuOrder, removeMenu, updateMenu } from "@/database";
import { Menu } from "@/database/schema";
import { isLoggedIn } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function onAdd(_prevState: any, formData: FormData) {
  if (!(await isLoggedIn())) {
    return { error: "Unauthorized" };
  }

  const data = {
    name: formData.get("name"),
    desc: formData.get("desc"),
    price: formData.get("price"),
    category: formData.get("category"),
  };

  if (!data.name || typeof data.name !== "string") {
    return { error: "Invalid name" };
  }

  if (!data.desc || typeof data.desc !== "string") {
    return { error: "Invalid description" };
  }

  if (!data.price || typeof data.price !== "string") {
    return { error: "Invalid price" };
  }

  if (!data.category || typeof data.category !== "string") {
    return { error: "Invalid category" };
  }

  const newMenu = {
    name: data.name,
    description: data.desc,
    categoryId: parseInt(data.category),
    price: parseInt(data.price),
    order: 0,
  };

  const lastOrder = await getMenuOrder(newMenu.categoryId);
  const order = lastOrder + 1;
  newMenu.order = order;

  await addMenu(newMenu);
  redirect("/admin/menu");
}

export async function onEdit(_prevState: any, formData: FormData) {
  if (!(await isLoggedIn())) {
    return { error: "Unauthorized" };
  }

  const data = {
    id: formData.get("id"),
    name: formData.get("name"),
    desc: formData.get("desc"),
    price: formData.get("price"),
    category: formData.get("category"),
    prevCategory: formData.get("prev-category"),
  };

  if (!data.id || typeof data.id !== "string") {
    return { error: "Invalid id" };
  }

  if (!data.name || typeof data.name !== "string") {
    return { error: "Invalid name" };
  }

  if (!data.desc || typeof data.desc !== "string") {
    return { error: "Invalid description" };
  }

  if (!data.price || typeof data.price !== "string") {
    return { error: "Invalid price" };
  }

  if (!data.category || typeof data.category !== "string") {
    return { error: "Invalid category" };
  }

  const newMenu: Partial<Menu> = {
    id: parseInt(data.id),
    name: data.name,
    description: data.desc,
    categoryId: parseInt(data.category),
    price: parseInt(data.price),
  };

  if (data.category !== data.prevCategory) {
    const lastOrder = await getMenuOrder(newMenu.categoryId!);
    const order = lastOrder + 1;
    newMenu.order = order;
  }

  await updateMenu(newMenu);
  redirect("/admin/menu");
}

export async function onDelete(formData: FormData) {
  if (!(await isLoggedIn())) return;

  const id = formData.get("id");

  if (!id || typeof id !== "string") return;

  await removeMenu(parseInt(id));
  redirect("/admin/menu");
}
