import Hero from "@/app/components/hero";
import AboutSection from "@/app/components/aboutSection";
import ContactSection from "@/app/components/contactSection";

export const metadata = {
  title: "Aplicação de Recrutamento",
  description: "Encontre vagas e conecte-se a empresas de forma rápida e eficiente.",
};

export default function Home() {
  return (
    <div>
      <Hero />
      <AboutSection />
      <ContactSection />
    </div>
  );
}
