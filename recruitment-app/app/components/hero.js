"use client";

import Image from "next/image";
import { Button } from "./ui/button";

export default function Hero() {
  return (
    <section className="bg-background overflow-hidden">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
        {/* LEFT */}
        <div className="flex-1 px-8 lg:px-20 py-20 z-10 text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold text-primary leading-snug mb-3">
            Simplifique e potencialize
            <br />
            todo o seu processo de contratação
          </h1>
          <p className="text-foreground text-base lg:text-lg mb-6 max-w-lg mx-auto lg:mx-0">
            A plataforma foi criada para tornar cada etapa da sua jornada de
            recrutamento mais simples e eficiente. Desde a criação da vaga com o
            apoio dos nossos especialistas até a integração do novo talento,
            oferecemos uma experiência ágil, segura e otimizada — ajudando sua
            empresa a economizar tempo, reduzir custos e contratar com mais
            assertividade.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <Button
              variant="primary"
              size="lg"
              onClick={() => alert("Cadastre-se")}
            >
              Cadastre-se
            </Button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative w-full lg:w-[40%] max-w-[500px] h-[300px] sm:h-[400px] lg:h-[657px] flex justify-center lg:justify-end mx-auto">
          <Image
            src="/hero.png"
            alt="Illustration"
            fill
            className="object-cover object-center lg:object-right"
            priority
          />
        </div>
      </div>
    </section>
  );
}
