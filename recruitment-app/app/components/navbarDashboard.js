"use client";

import { User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavbarDashboard() {
  const router = useRouter();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) setRole(storedRole);
  }, []);


  const homeRoute =
    role === "COMPANY"
      ? "/company"
      : role === "ADMIN"
      ? "/admin"
      : "/candidate";

  return (
    <header className="flex items-center justify-between px-6 bg-background-secondary border-b border-border">
      {/* Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => router.push(homeRoute)}
      >
        <a href={homeRoute} className="focus:outline-none flex-shrink-0">
          <Image src="/logo.png" alt="Logo" width={100} height={100} />
        </a>
      </div>

      {/* Profile */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => router.push("/candidate/profile")}
      >
        <div className="w-8 h-8 rounded-full bg-background-secondary flex items-center justify-center text-primary font-semibold">
          <User className="w-5 h-5 text-primary" />
        </div>
        <span className="text-foreground text-sm">Meu Perfil</span>
      </div>
    </header>
  );
}
