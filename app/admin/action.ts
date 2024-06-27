"use server";

import { login } from "./auth";

export async function onLogin(_prevState: any, formData: FormData) {
  "use server";
  const passcode = formData.get("passcode");
  const error = login(passcode?.toString());
  return { error };
}
