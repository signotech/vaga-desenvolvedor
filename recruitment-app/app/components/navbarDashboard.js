"use client";

import { User, LogOut } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavbarDashboard() {
  const router = useRouter();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) setRole(storedRole);
  }, []);

  const homeRoute =
    role === "COMPANY"
      ? "/company"
      : role === "ADMIN"
      ? "/admin"
      : "/candidate";

  const handleLogout = () => {
    // limpa os dados do usuário
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    // redireciona pra landing pública
    router.push("/");
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-background-secondary border-b border-border">
      {/* Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => router.push(homeRoute)}
      >
        <a href={homeRoute} className="focus:outline-none flex-shrink-0">
          <Image src="/logo.png" alt="Logo" width={100} height={100} />
        </a>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-6">
        {/* Profile */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => router.push(`${homeRoute}/profile`)}
        >
          <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center text-primary font-semibold border border-border">
            <User className="w-5 h-5 text-primary" />
          </div>
          <span className="text-foreground text-sm hover:underline">
            Meu Perfil
          </span>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border hover:bg-muted text-sm text-muted-foreground transition"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Sair</span>
        </button>
      </div>
    </header>
  );
}
