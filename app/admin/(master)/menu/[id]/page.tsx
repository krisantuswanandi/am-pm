import { getCategories, getMenuItem } from "@/database";
import { MenuForm } from "../form";
import { redirect } from "next/navigation";

interface Props {
  params: { id: string };
}

export default async function EditMenuPage({ params }: Props) {
  if (!params.id) redirect("/admin/menu");

  const id = parseInt(params.id);
  const menu = await getMenuItem(id).catch(() => null);
  const categories = await getCategories();

  if (!menu || !menu.length) redirect("/admin/menu");

  return <MenuForm value={menu[0]} categories={categories} />;
}
