"use server";

import { cookies } from "next/headers";

const SESSION_KEY = "session";
const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;

export async function onLogin(_prevState: any, formData: FormData) {
  const passcode = formData.get("passcode")?.toString() || "";

  if (!passcode) {
    return { error: "No password provided" };
  }

  if (passcode !== process.env.ADMIN_PASSCODE) {
    return { error: "Wrong password" };
  }

  const cookieStore = await cookies();
  cookieStore.set({
    name: SESSION_KEY,
    value: passcode,
    expires: Date.now() + ONE_WEEK,
    httpOnly: true,
    secure: true,
  });

  return {};
}

export async function onLogout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_KEY);
}
