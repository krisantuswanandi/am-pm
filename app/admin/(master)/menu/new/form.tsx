"use client";

import { ReactNode } from "react";
import { useFormState } from "react-dom";
import { onSubmit } from "./action";

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-2 text-sm">
      <div>{label}</div>
      {children}
    </div>
  );
}

export function MenuForm() {
  const [state, formAction] = useFormState(onSubmit, { error: "" });

  return (
    <form action={formAction}>
      <Field label="Name:">
        <input name="name" className="border border-stone-300" />
      </Field>
      <Field label="Description:">
        <input name="desc" className="border border-stone-300" />
      </Field>
      <Field label="Price:">
        <input type="number" name="price" className="border border-stone-300" />
      </Field>
      <Field label="Category:">
        <select name="category" className="border border-stone-300">
          <option value="1">Makanan</option>
          <option value="2">Minuman</option>
          <option value="3">Tambahan</option>
        </select>
      </Field>
      <div className="mt-2 text-xs text-red-500">{state?.error}</div>
      <button className="mt-2 bg-gray-400 px-2 py-1">Submit</button>
    </form>
  );
}
