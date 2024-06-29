import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import type { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const orders = sqliteTable("orders", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  transactionDate: text("transaction_date").notNull(),
});

export const orderLines = sqliteTable("order_lines", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  quantity: integer("quantity").notNull(),
  price: integer("price").notNull(),
  notes: text("notes"),
  orderId: integer("order_id")
    .references(() => orders.id)
    .notNull(),
});

export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  order: integer("order").notNull(),
});

export const menu = sqliteTable("menu", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: integer("price").notNull(),
  image: text("image"),
  order: integer("order").notNull(),
  categoryId: integer("category_id")
    .references(() => categories.id)
    .notNull(),
});

export type Order = InferSelectModel<typeof orders>;
export type NewOrder = InferInsertModel<typeof orders>;

export type OrderLine = InferSelectModel<typeof orderLines>;
export type NewOrderLine = InferInsertModel<typeof orderLines>;

export type Menu = InferSelectModel<typeof menu>;
export type NewMenu = InferInsertModel<typeof menu>;

export type Category = InferSelectModel<typeof categories>;
export type NewCategory = InferInsertModel<typeof categories>;
