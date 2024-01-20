import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import type { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const orders = sqliteTable("orders", {
  id: integer("id").primaryKey(),
  name: text("name"),
  address: text("address"),
  transactionDate: text("transaction_date"),
});

export const orderLines = sqliteTable("order_lines", {
  id: integer("id").primaryKey(),
  name: text("name"),
  quantity: integer("quantity"),
  price: integer("price"),
  notes: text("notes"),
  orderId: integer("order_id").references(() => orders.id),
});

export type Order = InferSelectModel<typeof orders>;
export type NewOrder = InferInsertModel<typeof orders>;

export type OrderLine = InferSelectModel<typeof orderLines>;
export type NewOrderLine = InferSelectModel<typeof orderLines>;
