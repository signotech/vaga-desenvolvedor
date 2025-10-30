import Hero from "./components/hero";
import AboutSection from "./components/aboutSection";
import ContactSection from "./components/contactSection";

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
