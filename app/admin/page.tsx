import { redirect } from "next/navigation";
import { LoginForm } from "./login-form";
import { isLoggedIn } from "@/lib/auth";

export default async function AdminPage() {
  if (await isLoggedIn()) {
    redirect("/admin/menu");
  }

  return (
    <div className="p-4">
      <LoginForm />
    </div>
  );
}
