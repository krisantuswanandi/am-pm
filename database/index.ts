import { revalidateTag, unstable_cache } from "next/cache";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as models from "./schema";
import { desc, eq } from "drizzle-orm";

const sqlite = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN!,
});

export { models };

export const db = drizzle(sqlite);

export const getMenu = unstable_cache(
  async () => {
    return db.select().from(models.menu);
  },
  ["menu"],
  {
    tags: ["menu"],
  },
);

export const getCategories = unstable_cache(
  async () => {
    return db.select().from(models.categories);
  },
  ["categories"],
  {
    tags: ["categories"],
  },
);

export async function addMenu(menu: models.NewMenu) {
  await db.insert(models.menu).values(menu);
  revalidateTag("menu");
}

export async function addCategory(category: models.NewCategory) {
  await db.insert(models.categories).values(category);
  revalidateTag("categories");
}

export async function removeMenu(id: number) {
  await db.delete(models.menu).where(eq(models.menu.id, id));
  revalidateTag("menu");
}

export async function removeCategory(id: number) {
  await db.delete(models.categories).where(eq(models.categories.id, id));
  revalidateTag("categories");
}

export async function getLastCategoryOrder() {
  const result = await db
    .select({ order: models.categories.order })
    .from(models.categories)
    .orderBy(desc(models.categories.order))
    .limit(1);
  if (!result || !result.length) return 0;
  return result[0].order;
}
