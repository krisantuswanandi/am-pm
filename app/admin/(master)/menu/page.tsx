import Link from "next/link";
import { getCategories, getMenu } from "@/database";
import { Button } from "@/components/ui/button";
import { AdminMenuList } from "./list";

export default async function AdminMenuPage() {
  const [menu, categoriesArr] = await Promise.all([getMenu(), getCategories()]);
  const categories = new Map(
    categoriesArr.map((category) => [category.id, category]),
  );

  const menuWithCategories = menu.map((item) => ({
    ...item,
    category: categories.get(item.categoryId)!,
  }));

  return (
    <div>
      <div className="mb-4">
        <Button asChild>
          <Link href="/admin/menu/new">Tambah Menu</Link>
        </Button>
      </div>

      <AdminMenuList menu={menuWithCategories} />
    </div>
  );
}
