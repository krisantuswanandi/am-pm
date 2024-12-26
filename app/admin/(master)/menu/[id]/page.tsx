import { getCategories, getMenuItem } from "@/database";
import { MenuForm } from "../form";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditMenuPage({ params }: Props) {
  const { id } = await params
  if (!id) redirect("/admin/menu");

  const menu = await getMenuItem(+id).catch(() => null);
  const categories = await getCategories();

  if (!menu || !menu.length) redirect("/admin/menu");

  return <MenuForm value={menu[0]} categories={categories} />;
}
