import { getCategory } from "@/database";
import { CategoriesForm } from "../form";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditCategoryPage({ params }: Props) {
  const { id } = await params
  if (!id) redirect("/admin/categories");

  const category = await getCategory(+id).catch(() => null);

  if (!category || !category.length) redirect("/admin/categories");

  return <CategoriesForm value={category[0]} />;
}
