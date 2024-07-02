import Link from "next/link";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
import { onLogout } from "../action";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isLoggedIn()) {
    redirect("/admin");
  }

  return (
    <div className="container">
      <div className="flex gap-2 py-2 text-blue-500 underline underline-offset-4">
        <Link href="/admin/menu">Menu</Link>
        <Link href="/admin/categories">Kategori</Link>
        <form action={onLogout} className="ml-auto">
          <button className="text-blue-500 underline underline-offset-4">
            Logout
          </button>
        </form>
      </div>
      <div>{children}</div>
    </div>
  );
}
