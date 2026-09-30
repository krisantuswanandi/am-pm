import { revalidateTag } from "next/cache";

export async function GET() {
  revalidateTag("menu", { expire: 0 });
  revalidateTag("categories", { expire: 0 });
  return Response.json({ message: "OK" });
}
