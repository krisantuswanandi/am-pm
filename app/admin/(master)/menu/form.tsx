"use client";

import { ReactNode } from "react";
import { useFormState } from "react-dom";
import { onAdd, onEdit } from "./action";
import { Category, Menu } from "@/database/schema";

interface Props {
  value?: Menu;
  categories: Category[];
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

export function MenuForm({ value, categories }: Props) {
  const onSubmit = !value ? onAdd : onEdit;
  const [state, formAction] = useFormState(onSubmit, { error: "" });

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={value?.id} />
      <input type="hidden" name="prev-category" value={value?.categoryId} />
      <Field label="Name:">
        <input
          name="name"
          className="border border-stone-300"
          defaultValue={value?.name}
        />
      </Field>
      <Field label="Description:">
        <input
          name="desc"
          className="border border-stone-300"
          defaultValue={value?.description || ""}
        />
      </Field>
      <Field label="Price:">
        <input
          type="number"
          name="price"
          className="border border-stone-300"
          defaultValue={value?.price}
        />
      </Field>
      <Field label="Category:">
        <select
          name="category"
          className="border border-stone-300"
          defaultValue={value?.categoryId}
        >
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
