import { getCategory } from "@/database";
import { CategoriesForm } from "../form";
import { redirect } from "next/navigation";

interface Props {
  params: { id: string };
}

export default async function EditCategoryPage({ params }: Props) {
  if (!params.id) redirect("/admin/categories");

  const id = parseInt(params.id);
  const category = await getCategory(id).catch(() => null);

  if (!category || !category.length) redirect("/admin/categories");

  return <CategoriesForm value={category[0]} />;
}
