import { revalidateTag, unstable_cache } from "next/cache";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as models from "./schema";

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
