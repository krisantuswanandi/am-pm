"use server";

import { login, logout } from "@/lib/auth";

export async function onLogin(_prevState: any, formData: FormData) {
  const passcode = formData.get("passcode");
  const error = login(passcode?.toString());
  return { error };
}

export async function onLogout() {
  logout();
}
