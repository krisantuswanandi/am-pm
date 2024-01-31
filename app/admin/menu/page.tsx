import Image from "next/image";
import { getCategories, getMenu } from "@/database";

export default async function AdminMenuPage() {
  const [menu, categoriesArr] = await Promise.all([getMenu(), getCategories()]);
  const categories = new Map(
    categoriesArr.map((category) => [category.id, category.name]),
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
        {menu.map((item) => (
          <tr key={item.id} className="hover:bg-neutral-200">
            <td>{item.id}</td>
            <td>
              {item.image ? (
                <Image
                  src={item.image || ""}
                  width={64}
                  height={64}
                  alt={item.name || ""}
                />
              ) : (
                <div className="h-16 w-16 bg-neutral-300" />
              )}
            </td>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{categories.get(item.categoryId)}</td>
            <td>{item.description}</td>
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
