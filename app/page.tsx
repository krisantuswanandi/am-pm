import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 justify-center">
      <div className="flex flex-col items-center">
        <Image
          src="/logo.png"
          alt="am.pm"
          width={140}
          height={140}
          priority={true}
        />
        <h1 className="text-[#EDA94C] text-2xl">am.pm</h1>
        <Button asChild className="mt-4">
          <Link href="/order">Pesan antar</Link>
        </Button>
      </div>
    </main>
  );
}
