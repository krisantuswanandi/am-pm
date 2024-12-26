import { cookies } from "next/headers";

const SESSION_KEY = "session";

export async function isLoggedIn() {
  const cookieStore = await cookies();
  const passcode = cookieStore.get(SESSION_KEY);
  return passcode?.value === process.env.ADMIN_PASSCODE;
}
