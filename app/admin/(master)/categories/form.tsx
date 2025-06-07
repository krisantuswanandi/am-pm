"use client";

import { ReactNode } from "react";
import { useActionState } from "react";
import { onAdd, onEdit } from "./action";
import { Category } from "@/database/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

interface Props {
  value?: Category;
}

export function Field({
  htmlFor,
  label,
  children,
}: {
  htmlFor: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={htmlFor} className="mb-2">
        {label}
      </Label>
      {children}
    </div>
  );
}

export function CategoriesForm({ value }: Props) {
  const onSubmit = !value ? onAdd : onEdit;
  const [state, formAction] = useActionState(onSubmit, { error: "" });

  return (
    <div className="max-w-md rounded-lg border border-stone-200 bg-white p-4">
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="id" value={value?.id} />

        <Field label="Nama Kategori" htmlFor="name">
          <Input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={value?.name}
            className="bg-white"
            placeholder="Masukkan nama kategori"
          />
        </Field>

        {state?.error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
            {state.error}
          </div>
        )}

        <div className="flex justify-end gap-2">
          <Button asChild variant="secondary">
            <Link href="/admin/categories">Kembali</Link>
          </Button>
          <Button type="submit">
            {value ? "Ubah Kategori" : "Tambah Kategori"}
          </Button>
        </div>
      </form>
    </div>
  );
}
