"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background-secondary border-b border-border">
      <div className="container mx-auto px-4 py-1">
        <nav className="flex items-center justify-between w-full">
          {/* LEFT - Logo */}
          <a href="/" className="focus:outline-none flex-shrink-0">
            <Image src="/logo.png" alt="Logo" width={100} height={100} />
          </a>

          {/* MIDDLE + RIGHT - Desktop */}
          <div className="hidden lg:flex items-center justify-between flex-1 ml-10">
            {/* MIDDLE - Links */}
            <div className="flex items-center space-x-12 mx-auto">
              <Link
                href="/"
                className="text-foreground hover:text-primary font-medium transition-colors"
              >
                Início
              </Link>
              <a
                href="#aboutSection"
                className="text-foreground hover:text-primary font-medium transition-colors"
              >
                Sobre
              </a>
              <a
                href="#contactSection"
                className="text-foreground hover:text-primary font-medium transition-colors"
              >
                Contato
              </a>
            </div>

            {/* RIGHT - Buttons */}
            <div className="flex items-center space-x-4">
              <Button
                variant="secondary"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/login-company");
                }}
              >
                Login Empresa
              </Button>
              <Button
                variant="primary"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/login-candidate");
                }}
              >
                Login Candidato
              </Button>
            </div>
          </div>

          {/* MOBILE - Menu Icon */}
          <div className="lg:hidden flex items-center">
            <button
              className="p-2 text-foreground focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Abrir menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>

        {/* MOBILE - Dropdown Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-3 flex flex-col items-center border-t border-border">
            <Link
              href="/"
              className="block py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <a
              href="#aboutSection"
              className="block py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre
            </a>
            <a
              href="#contactSection"
              className="block py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </a>

            <Button
              variant="secondary"
              className="w-11/12"
              onClick={(e) => {
                e.preventDefault();
                setIsMenuOpen(false);
                router.push("/login-company");
              }}
            >
              Login Empresa
            </Button>

            <Button
              variant="primary"
              className="w-11/12"
              onClick={(e) => {
                e.preventDefault();
                setIsMenuOpen(false);
                router.push("/login-candidate");
              }}
            >
              Login Candidato
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
