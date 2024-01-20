import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

export * as models from "./schema";

const sqlite = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN!,
});

export const db = drizzle(sqlite);
