"use server";

import { addCategory } from "@/database";
import { redirect } from "next/navigation";

export async function onSubmit(_prevState: any, formData: FormData) {
  const name = formData.get("name");

  if (!name || typeof name !== "string") {
    return { error: "Invalid category name" };
  }

  await addCategory({ name, order: 1 });
  redirect("/admin/categories");
}
