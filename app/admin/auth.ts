import { cookies } from "next/headers";

const SESSION_KEY = "session";
const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;

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

  cookies().set({
    name: SESSION_KEY,
    value: passcode,
    expires: Date.now() + ONE_WEEK,
    httpOnly: true,
    secure: true,
  });
}
