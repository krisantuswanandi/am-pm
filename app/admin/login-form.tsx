"use client";

import { useActionState } from "react";
import { onLogin } from "./action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const [state, formAction] = useActionState(onLogin, { error: "" });

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50 px-4">
      <form action={formAction} className="w-full max-w-sm space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="passcode"
            className="text-sm font-medium text-stone-700"
          >
            Passcode
          </Label>
          <Input
            id="passcode"
            type="password"
            name="passcode"
            className="w-full bg-white"
            required
          />
        </div>

        {state?.error && (
          <div className="text-sm text-red-600">{state.error}</div>
        )}

        <Button
          type="submit"
          className="w-full bg-[#EDA94C] text-white hover:bg-[#d89938]"
        >
          Login
        </Button>
      </form>
    </div>
  );
}
