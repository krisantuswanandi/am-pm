"use client";

import { ReactNode } from "react";
import { useFormState } from "react-dom";
import { onSubmit } from "./action";
import { Category } from "@/database/schema";

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

export function MenuForm({ categories }: { categories: Category[] }) {
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
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </Field>
      <div className="mt-2 text-xs text-red-500">{state?.error}</div>
      <button className="mt-2 bg-gray-400 px-2 py-1">Submit</button>
    </form>
  );
}
