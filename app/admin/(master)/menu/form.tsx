"use client";

import { ReactNode, useState } from "react";
import { useActionState } from "react";
import { onAdd, onEdit } from "./action";
import { Category, Menu } from "@/database/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

interface Props {
  value?: Menu;
  categories: Category[];
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

export function MenuForm({ value, categories }: Props) {
  const onSubmit = !value ? onAdd : onEdit;
  const [state, formAction] = useActionState(onSubmit, { error: "" });
  const [selectedCategory, setSelectedCategory] = useState(
    value?.categoryId?.toString() || "",
  );

  return (
    <div className="max-w-md rounded-lg border border-stone-200 bg-white p-4">
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="id" value={value?.id} />
        <input type="hidden" name="prev-category" value={value?.categoryId} />
        <input type="hidden" name="category" value={selectedCategory} />

        <Field label="Nama Menu" htmlFor="name">
          <Input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={value?.name}
            placeholder="Masukkan nama menu"
            className="mt-2"
          />
        </Field>

        <Field label="Deskripsi" htmlFor="desc">
          <Textarea
            id="desc"
            name="desc"
            rows={3}
            defaultValue={value?.description || ""}
            placeholder="Masukkan deskripsi menu (opsional)"
          />
        </Field>

        <Field label="Harga" htmlFor="price">
          <div className="relative">
            <span className="text-muted-foreground absolute top-1/2 left-2.5 -translate-y-1/2 text-sm">
              Rp
            </span>
            <Input
              id="price"
              type="number"
              name="price"
              required
              min="0"
              step="1000"
              className="pl-8"
              defaultValue={value?.price}
              placeholder="0"
            />
          </div>
        </Field>

        <Field label="Kategori" htmlFor="category">
          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih kategori" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem value={category.id.toString()} key={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        {state?.error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
            {state.error}
          </div>
        )}

        <div className="flex justify-end gap-2">
          <Button asChild variant="secondary">
            <Link href="/admin/menu">Kembali</Link>
          </Button>
          <Button type="submit">{value ? "Ubah Menu" : "Tambah Menu"}</Button>
        </div>
      </form>
    </div>
  );
}
