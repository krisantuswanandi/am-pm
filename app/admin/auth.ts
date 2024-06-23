import { cookies } from "next/headers";

const SESSION_KEY = "session";

export function isLoggedIn() {
  const passcode = cookies().get(SESSION_KEY);
  return passcode?.value === process.env.ADMIN_PASSCODE;
}

export function login(passcode = "") {
  if (!passcode) {
    console.log("no password");
  }

  if (passcode !== process.env.ADMIN_PASSCODE) {
    console.log("wrong password");
  }

  cookies().set(SESSION_KEY, passcode);
}
