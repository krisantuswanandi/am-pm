"use server";

import { addMenu, getMenuOrder, removeMenu, updateMenu } from "@/database";
import { Menu } from "@/database/schema";
import { isLoggedIn } from "@/lib/auth";
import { redirect } from "next/navigation";
import sharp from "sharp";

async function compressImageToBase64(file: File): Promise<string | undefined> {
  if (!file || file.size === 0) return undefined;
  const buffer = Buffer.from(await file.arrayBuffer());
  try {
    const compressed = await sharp(buffer)
      .resize(200, 200, { fit: "cover" })
      .jpeg({ quality: 75 })
      .toBuffer();
    return `data:image/jpeg;base64,${compressed.toString("base64")}`;
  } catch {
    return undefined;
  }
}

export async function onAdd(_prevState: any, formData: FormData) {
  if (!(await isLoggedIn())) {
    return { error: "Unauthorized" };
  }

  const data = {
    name: formData.get("name"),
    desc: formData.get("desc"),
    price: formData.get("price"),
    category: formData.get("category"),
    status: formData.get("status"),
    image: formData.get("image"),
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
  if (!data.status || typeof data.status !== "string") {
    return { error: "Invalid status" };
  }

  let base64Image: string | undefined = undefined;
  if (
    data.image &&
    typeof data.image === "object" &&
    "arrayBuffer" in data.image
  ) {
    base64Image = await compressImageToBase64(data.image as File);
    if (data.image.size > 0 && !base64Image) {
      return { error: "Gagal memproses gambar." };
    }
  }

  const newMenu = {
    name: data.name,
    description: data.desc,
    categoryId: parseInt(data.category),
    price: parseInt(data.price),
    order: 0,
    status: data.status,
    image: base64Image,
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
    status: formData.get("status"),
    image: formData.get("image"),
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
  if (!data.status || typeof data.status !== "string") {
    return { error: "Invalid status" };
  }

  let base64Image: string | undefined = undefined;
  if (
    data.image &&
    typeof data.image === "object" &&
    "arrayBuffer" in data.image
  ) {
    base64Image = await compressImageToBase64(data.image as File);
    if (data.image.size > 0 && !base64Image) {
      return { error: "Gagal memproses gambar." };
    }
  }

  const newMenu: Partial<Menu> = {
    id: parseInt(data.id),
    name: data.name,
    description: data.desc,
    categoryId: parseInt(data.category),
    price: parseInt(data.price),
    status: data.status,
    ...(base64Image ? { image: base64Image } : {}),
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
