"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NavbarDashboard() {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between px-6 bg-background-secondary border-b border-border">
      {/* Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <a href="/" className="focus:outline-none flex-shrink-0">
          <Image src="/logo.png" alt="Logo" width={100} height={100} />
        </a>
      </div>

      {/* Profile */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => router.push("/profile")}
      >
        <div className="w-8 h-8 rounded-full bg-background-secondary flex items-center justify-center text-primary font-semibold">
          P
        </div>
        <span className="text-foreground text-sm">Meu Perfil</span>
      </div>
    </header>
  );
}
