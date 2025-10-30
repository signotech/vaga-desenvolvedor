"use client";

import { useState } from "react";
import { Button } from "./ui/button";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: "error", message: "Preencha todos os campos obrigatórios." });
      return;
    }

    // Simulação de envio (poderia ser via emailjs, api interna, etc)
    setTimeout(() => {
      setStatus({ type: "success", message: "Mensagem enviada com sucesso!" });
      setFormData({ name: "", email: "", message: "" });
    }, 800);
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-primary mb-6">Entre em Contato</h2>
        <p className="text-foreground mb-10">
          Tem alguma dúvida, sugestão ou quer falar com nossa equipe?  
          Envie uma mensagem e retornaremos o mais breve possível.
        </p>

        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto space-y-4 text-left"
        >
          <input
            type="text"
            name="name"
            placeholder="Seu nome"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-border bg-background-secondary text-muted"
          />
          <input
            type="email"
            name="email"
            placeholder="Seu e-mail"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-border bg-background-secondary text-muted"
          />
          <textarea
            name="message"
            placeholder="Sua mensagem"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-border bg-background-secondary text-muted"
          />
          {status.message && (
            <div
              className={`text-sm p-2 rounded ${
                status.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {status.message}
            </div>
          )}
          <Button
            type="submit"
            variant="primary"
            className="w-full py-2"
          >
            Enviar Mensagem
          </Button>
        </form>
      </div>
    </section>
  );
}
