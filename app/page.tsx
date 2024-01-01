import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";

export default function Home() {
  const instagram = process.env.NEXT_PUBLIC_INSTAGRAM;
  const whatsapp = process.env.NEXT_PUBLIC_PHONE_NUMBER;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center">
        <Image
          src="/logo.png"
          alt="am.pm"
          width={140}
          height={140}
          priority={true}
        />
        <h1 className="text-2xl text-[#EDA94C]">am.pm</h1>
        <Button asChild className="mt-4">
          <Link href="/order">Pesan antar</Link>
        </Button>
        <div className="mt-4 flex justify-center gap-4 py-2 text-stone-400">
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
        <div className="overflow-hidden rounded-md border border-stone-300 shadow">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d971.3096274556937!2d124.88905742752227!3d-9.111819731911137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2cffbe73c8290341%3A0x3d36f5d737bcb6b0!2sRumah%20Makan%2099%20Kyu%20Kyu!5e0!3m2!1sen!2sid!4v1704083274621!5m2!1sen!2sid"
            width="400"
            height="250"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </main>
  );
}
