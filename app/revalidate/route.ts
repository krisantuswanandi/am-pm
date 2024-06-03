import { revalidateTag } from "next/cache";

export async function GET() {
  revalidateTag("menu");
  revalidateTag("categories");
  return Response.json({ message: "OK" });
}
