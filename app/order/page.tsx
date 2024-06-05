import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { MenuCategory } from "./menu";
import { ViewCart } from "./view-cart";
import { getCategories, getMenu } from "@/database";

const instagram = process.env.NEXT_PUBLIC_INSTAGRAM;
const whatsapp = process.env.NEXT_PUBLIC_PHONE_NUMBER;

export default async function MenuPage() {
  const [menu, categories] = await Promise.all([getMenu(), getCategories()]);

  return (
    <main className="container p-4">
      <Link href="/" className="flex flex-col items-center p-12">
        <Image
          src="/logo.png"
          alt="am.pm"
          width={140}
          height={140}
          priority={true}
        />
        <h1 className="text-2xl text-[#EDA94C]">am.pm</h1>
      </Link>
      <div className="flex flex-col gap-16">
        {categories.map((category) => (
          <MenuCategory
            key={category.id}
            title={category.name || ""}
            menu={menu.filter((i) => i.categoryId === category.id)}
          />
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-4 py-4 text-stone-400 max-[390px]:flex-col max-[390px]:items-center max-[390px]:gap-0">
        <a
          href={`https://instagram.com/${instagram}`}
          target="_blank"
          className="flex items-center gap-1 p-2"
        >
          <FaInstagram size="1.4em" />
          <span className="text-sm">@{instagram}</span>
        </a>
        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          className="flex items-center gap-1 p-2"
        >
          <FaWhatsapp size="1.4em" />
          <span className="text-sm">+{whatsapp}</span>
        </a>
      </div>
      <ViewCart />
    </main>
  );
}
