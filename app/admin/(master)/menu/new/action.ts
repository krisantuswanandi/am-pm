"use server";

import { addMenu } from "@/database";
import { redirect } from "next/navigation";

export async function onSubmit(_prevState: any, formData: FormData) {
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

  await addMenu({
    name: data.name,
    description: data.desc,
    categoryId: parseInt(data.category),
    price: parseInt(data.price),
    order: 1,
  });
  redirect("/admin/menu");
}
