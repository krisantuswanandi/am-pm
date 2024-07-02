"use server";

import { addMenu, getMenuOrder, removeMenu } from "@/database";
import { isLoggedIn } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function onSubmit(_prevState: any, formData: FormData) {
  if (!isLoggedIn()) {
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

export async function onDelete(formData: FormData) {
  if (!isLoggedIn()) {
    return { error: "Unauthorized" };
  }

  const id = formData.get("id");

  if (!id || typeof id !== "string") {
    return { error: "Invalid category id" };
  }

  await removeMenu(parseInt(id));
  redirect("/admin/menu");
}
