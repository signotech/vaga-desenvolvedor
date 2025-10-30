"use client";

export default function Footer() {
  return (
    <footer className="bg-background-secondary text-foreground">
      <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* LEFT */}
        <p className="text-sm text-center sm:text-left">
          © {new Date().getFullYear()} Aplicação de Recrutamento. Todos os direitos reservados.
        </p>

        {/* RIGHT */}
        <div className="flex space-x-4 text-sm">
          <a href="/privacy" className="hover:text-primary transition-colors">
            Política de Privacidade
          </a>
          <a href="/terms" className="hover:text-primary transition-colors">
            Termos de Uso
          </a>
          <a href="/contact" className="hover:text-primary transition-colors">
            Contato
          </a>
        </div>
      </div>
    </footer>
  );
}
