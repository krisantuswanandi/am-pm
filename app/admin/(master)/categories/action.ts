"use server";

import {
  addCategory,
  getCategories,
  getLastCategoryOrder,
  getMenu,
  removeCategory,
  updateCategory,
} from "@/database";
import { isLoggedIn } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function onAdd(_prevState: any, formData: FormData) {
  if (!isLoggedIn()) {
    return { error: "Unauthorized" };
  }

  const name = formData.get("name");

  if (!name || typeof name !== "string") {
    return { error: "Invalid category name" };
  }
  const lastOrder = await getLastCategoryOrder();
  const order = lastOrder + 1;

  await addCategory({ name, order });
  redirect("/admin/categories");
}

export async function onEdit(_prevState: any, formData: FormData) {
  if (!isLoggedIn()) {
    return { error: "Unauthorized" };
  }

  const id = formData.get("id");
  const name = formData.get("name");

  if (!id || typeof id !== "string") {
    return { error: "Invalid category id" };
  }
  if (!name || typeof name !== "string") {
    return { error: "Invalid category name" };
  }

  await updateCategory({ id: parseInt(id), name });
  redirect("/admin/categories");
}

export async function onDelete(formData: FormData) {
  if (!isLoggedIn()) {
    return { error: "Unauthorized" };
  }

  const id = formData.get("id");

  if (!id || typeof id !== "string") {
    return { error: "Invalid category id" };
  }

  const categoryId = parseInt(id);

  try {
    await removeCategory(categoryId);
    redirect("/admin/categories");
  } catch {
    // get menu and categories are cached so it's okay to fetch all (probably)
    const menu = await getMenu();
    const categories = await getCategories();

    const toRemoveMenu = menu
      .filter((item) => item.categoryId === categoryId)
      .map((item) => item.name);
    const category = categories.find((category) => category.id === categoryId);
    throw new Error(
      `Hapus ${toRemoveMenu.length} menu (${toRemoveMenu.join(
        ", ",
      )}) sebelum hapus kategori "${category?.name}"!`,
    );
  }
}
