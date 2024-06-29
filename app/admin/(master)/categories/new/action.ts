"use server";

import { addCategory, removeCategory } from "@/database";
import { redirect } from "next/navigation";

export async function onSubmit(_prevState: any, formData: FormData) {
  const name = formData.get("name");

  if (!name || typeof name !== "string") {
    return { error: "Invalid category name" };
  }

  await addCategory({ name, order: 1 });
  redirect("/admin/categories");
}

export async function onDelete(formData: FormData) {
  const id = formData.get("id");

  if (!id || typeof id !== "string") {
    return { error: "Invalid category id" };
  }

  await removeCategory(parseInt(id));
  redirect("/admin/categories");
}
