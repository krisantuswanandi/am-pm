import { db, models } from "@/database";

export default async function AdminCategoriesPage() {
  const rows = await db.select().from(models.categories);

  return (
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
