import { CartForm } from "./form";
import { db, models } from "@/database";
import type { OrderPayload } from "@/types";

export default function CartPage() {
  async function onSubmit(payload: OrderPayload) {
    "use server";

    try {
      await db.transaction(async (tx) => {
        const order = await tx
          .insert(models.orders)
          .values({
            name: payload.name,
            address: payload.address,
            transactionDate: new Date().toISOString(),
          })
          .returning({ id: models.orders.id });

        const orderId = order[0].id;

        await tx.insert(models.orderLines).values(
          payload.items.map((i) => ({
            name: i.menu.name,
            quantity: i.qty,
            price: i.menu.price,
            notes: i.notes,
            orderId,
          })),
        );
      });
    } catch {
      // don't care about the error
    }
  }

  return <CartForm onSubmit={onSubmit} />;
}
