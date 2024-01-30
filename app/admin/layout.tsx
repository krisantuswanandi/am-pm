import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container">
      <div className="flex gap-2 py-2 text-blue-500 underline underline-offset-4">
        <Link href="/admin/menu">Menu</Link>
        <Link href="/admin/categories">Kategori</Link>
      </div>
      <div>{children}</div>
    </div>
  );
}
