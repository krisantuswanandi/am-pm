import { getCategories } from "@/database";
import { MenuForm } from "./form";

export default async function NewMenuPage() {
  const categories = await getCategories();

  return <MenuForm categories={categories} />;
}
