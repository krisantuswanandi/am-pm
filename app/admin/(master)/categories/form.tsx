"use client";

import { ReactNode } from "react";
import { useFormState } from "react-dom";
import { onAdd, onEdit } from "./action";
import { Category } from "@/database/schema";

interface Props {
  value?: Category;
}

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

export function CategoriesForm({ value }: Props) {
  const onSubmit = !value ? onAdd : onEdit;
  const [state, formAction] = useFormState(onSubmit, { error: "" });

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={value?.id} />
      <Field label="Name:">
        <input
          name="name"
          className="border border-stone-300"
          defaultValue={value?.name}
        />
      </Field>
      <div className="mt-2 text-xs text-red-500">{state?.error}</div>
      <button className="mt-2 bg-gray-400 px-2 py-1">Submit</button>
    </form>
  );
}
