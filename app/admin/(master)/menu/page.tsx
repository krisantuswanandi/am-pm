import Image from "next/image";
import Link from "next/link";
import { getCategories, getMenu } from "@/database";
import { onDelete } from "./action";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

export default async function AdminMenuPage() {
  const [menu, categoriesArr] = await Promise.all([getMenu(), getCategories()]);
  const categories = new Map(
    categoriesArr.map((category) => [category.id, category.name]),
  );

  return (
    <div>
      <div className="mb-4">
        <Button asChild>
          <Link href="/admin/menu/new">Tambah Menu</Link>
        </Button>
      </div>

      <div className="space-y-4">
        {menu.map((item) => (
          <div
            key={item.id}
            className="rounded-lg border border-stone-200 bg-white p-4"
          >
            <div className="flex gap-4">
              {/* Image */}
              <div className="flex-shrink-0">
                {item.image ? (
                  <Image
                    src={item.image}
                    width={80}
                    height={80}
                    alt={item.name || ""}
                    className="rounded-lg object-cover"
                  />
                ) : (
                  <div className="h-20 w-20 rounded-lg bg-stone-200" />
                )}
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="mb-2">
                  <div>
                    <h3 className="font-medium text-stone-900">{item.name}</h3>
                    <p className="mt-1 text-sm text-stone-600">
                      {formatCurrency(item.price)}
                    </p>
                  </div>
                </div>

                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded bg-stone-100 px-2 py-1 text-xs text-stone-600">
                    {categories.get(item.categoryId)}
                  </span>
                </div>

                {item.description && (
                  <p className="mb-3 line-clamp-2 text-sm text-stone-600">
                    {item.description}
                  </p>
                )}

                <div className="flex gap-2">
                  <Link
                    href={`/admin/menu/${item.id}`}
                    className="inline-flex items-center rounded-md bg-blue-50 px-3 py-1.5 text-sm text-blue-700 transition-colors hover:bg-blue-100"
                  >
                    Ubah
                  </Link>
                  <form className="inline" action={onDelete}>
                    <input type="hidden" name="id" value={item.id} />
                    <button className="inline-flex items-center rounded-md bg-red-50 px-3 py-1.5 text-sm text-red-700 transition-colors hover:bg-red-100">
                      Hapus
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
