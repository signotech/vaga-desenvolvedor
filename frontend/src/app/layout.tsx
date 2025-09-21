import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gestão de Vagas",
  description: "CRUD de Vagas e Candidatos",
};

function Header() {
  return (
    <header className="border-b bg-white/70 backdrop-blur sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          👔 Gestão de Vagas
        </Link>
        <div className="flex gap-2">
          <Link
            href="/"
            className="px-3 py-2 rounded-md border hover:bg-gray-50"
          >
            Home
          </Link>
          <Link
            href="/vagas"
            className="px-3 py-2 rounded-md border hover:bg-gray-50"
          >
            Vagas
          </Link>
          <Link
            href="/candidatos"
            className="px-3 py-2 rounded-md border hover:bg-gray-50"
          >
            Candidatos
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 text-gray-900">
        <Header />
        <main className="max-w-6xl mx-auto px-12 py-8">{children}</main>
      </body>
    </html>
  );
}
