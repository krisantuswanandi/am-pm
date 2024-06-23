import { redirect } from "next/navigation";
import { isLoggedIn, login } from "./auth";

export default function AdminPage() {
  if (isLoggedIn()) {
    redirect("/admin/menu");
  }

  async function submit(formData: FormData) {
    "use server";
    const passcode = formData.get("passcode");
    login(passcode?.toString());
  }

  return (
    <div>
      <div>Passcode:</div>
      <form action={submit}>
        <input type="password" name="passcode" />
      </form>
    </div>
  );
}
