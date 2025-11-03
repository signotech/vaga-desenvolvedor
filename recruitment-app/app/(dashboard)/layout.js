import "@/app/globals.css";
import { Inter } from "next/font/google";
import NavbarDashboard from "@/app/components/navbarDashboard";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Aplicação de Recrutamento",
  description: "Plataforma para empresas e candidatos conectarem oportunidades de emprego.",
  keywords: ["recrutamento", "empresas", "candidatos", "vagas", "trabalho", "carreira"],
  authors: [{ name: "Priscila Carla de Oliveira Coutinho" }],
  creator: "Priscila Carla",
  robots: {
    index: true,
    follow: true,
  },
};

export default function PublicLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-background text-foreground`}>
        <NavbarDashboard />
        <main>{children}</main>
      </body>
    </html>
  );
}
