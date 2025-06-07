import Link from "next/link";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
import { onLogout } from "../action";
import { Button } from "@/components/ui/button";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isLoggedIn())) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <nav className="border-b border-stone-200 bg-white p-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex">
            <Button asChild variant="link" className="px-2">
              <Link href="/admin/menu" className="text-stone-600">
                Menu
              </Link>
            </Button>
            <Button asChild variant="link" className="px-2">
              <Link href="/admin/categories" className="text-stone-600">
                Kategori
              </Link>
            </Button>
          </div>
          <form action={onLogout}>
            <Button className="px-2 text-red-500" variant="ghost">
              Logout
            </Button>
          </form>
        </div>
      </nav>
      <main className="p-4">{children}</main>
    </div>
  );
}
