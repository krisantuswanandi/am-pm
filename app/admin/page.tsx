import { redirect } from "next/navigation";
import { LoginForm } from "./login-form";
import { isLoggedIn } from "./auth";

export default function AdminPage() {
  if (isLoggedIn()) {
    redirect("/admin/menu");
  }

  return (
    <div className="p-4">
      <LoginForm />
    </div>
  );
}
