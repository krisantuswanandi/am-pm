import Image from "next/image";
import { eq } from "drizzle-orm";
import { db, models } from "@/database";

export default async function AdminMenuPage() {
  const rows = await db
    .select()
    .from(models.menu)
    .innerJoin(
      models.categories,
      eq(models.menu.categoryId, models.categories.id),
    );

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-black text-left">
          <th>No</th>
          <th>Gambar</th>
          <th>Nama</th>
          <th>Harga</th>
          <th>Kategori</th>
          <th>Deskripsi</th>
          <th>Tindakan</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.menu.id} className="hover:bg-neutral-200">
            <td>{row.menu.id}</td>
            <td>
              {row.menu.image ? (
                <Image
                  src={row.menu.image || ""}
                  width={64}
                  height={64}
                  alt={row.menu.name || ""}
                />
              ) : (
                <div className="h-16 w-16 bg-neutral-300" />
              )}
            </td>
            <td>{row.menu.name}</td>
            <td>{row.menu.price}</td>
            <td>{row.categories.name}</td>
            <td>{row.menu.description}</td>
            <td>
              <button className="text-blue-500 underline underline-offset-4">
                ubah
              </button>
              <button className="ml-2 text-blue-500 underline underline-offset-4">
                hapus
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
