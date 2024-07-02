"use server";

import { addCategory, removeCategory } from "@/database";
import { isLoggedIn } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function onSubmit(_prevState: any, formData: FormData) {
  if (!isLoggedIn()) {
    return { error: "Unauthorized" };
  }

  const name = formData.get("name");

  if (!name || typeof name !== "string") {
    return { error: "Invalid category name" };
  }

  await addCategory({ name, order: 1 });
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

  await removeCategory(parseInt(id));
  redirect("/admin/categories");
}
