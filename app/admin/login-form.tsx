"use client";

import { useActionState } from "react";
import { onLogin } from "./action";

export function LoginForm() {
  const [state, formAction] = useActionState(onLogin, { error: "" });

  return (
    <form action={formAction}>
      <div>Passcode:</div>
      <div>
        <input
          type="password"
          name="passcode"
          className="border border-stone-300"
        />
      </div>
      <div className="mt-1 text-xs text-red-500">{state?.error}</div>
    </form>
  );
}
