import Link from "next/link";
import { getCategories } from "@/database";
import { onDelete } from "./action";

export default async function AdminCategoriesPage() {
  const rows = await getCategories();

  return (
    <div>
      <div className="my-4">
        <Link href="/admin/categories/new" className="bg-gray-400 p-2">
          Tambah kategori
        </Link>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-black text-left">
            <th>No</th>
            <th>Nama</th>
            <th>Tindakan</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-neutral-200">
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>
                <button className="text-blue-500 underline underline-offset-4">
                  ubah
                </button>
                <form className="inline" action={onDelete}>
                  <input type="hidden" name="id" value={row.id} />
                  <button className="ml-2 text-blue-500 underline underline-offset-4">
                    hapus
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
