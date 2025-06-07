import Link from "next/link";
import { getCategories } from "@/database";
import { onDelete } from "./action";
import { Button } from "@/components/ui/button";

export default async function AdminCategoriesPage() {
  const rows = await getCategories();

  return (
    <div>
      <div className="mb-4">
        <Button asChild>
          <Link href="/admin/categories/new">Tambah Kategori</Link>
        </Button>
      </div>

      <div className="space-y-4">
        {rows.map((row) => (
          <div
            key={row.id}
            className="rounded-lg border border-stone-200 bg-white p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-stone-900">{row.name}</span>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/admin/categories/${row.id}`}
                  className="inline-flex items-center rounded-md bg-blue-50 px-3 py-1.5 text-sm text-blue-700 transition-colors hover:bg-blue-100"
                >
                  Ubah
                </Link>
                <form className="inline" action={onDelete}>
                  <input type="hidden" name="id" value={row.id} />
                  <button className="inline-flex items-center rounded-md bg-red-50 px-3 py-1.5 text-sm text-red-700 transition-colors hover:bg-red-100">
                    Hapus
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
