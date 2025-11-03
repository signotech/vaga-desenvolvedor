"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/app/components/ui/button";

export default function RegisterCompany() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    bio: "",
    role: "COMPANY",
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ type: "", message: "" });
    setLoading(true);

    try {
      const res = await axios.post("/api/auth/register", formData);
      setAlert({ type: "success", message: res.data.message });
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        bio: "",
        role: "COMPANY",
      });
    } catch (err) {
      const message =
        err.response?.data?.message || "Erro ao cadastrar empresa";
      setAlert({ type: "error", message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 mb-10 bg-background-secondary border border-border p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center text-primary">
        Cadastro de Empresa
      </h2>

      {alert.message && (
        <div
          className={`mb-4 p-3 rounded text-sm ${
            alert.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {alert.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Nome da empresa"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-border p-2 rounded bg-transparent"
        />
        <input
          name="email"
          type="email"
          placeholder="E-mail"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-border p-2 rounded bg-transparent"
        />
        <input
          name="password"
          type="password"
          placeholder="Senha"
          required
          value={formData.password}
          onChange={handleChange}
          className="w-full border border-border p-2 rounded bg-transparent"
        />
        <input
          name="phone"
          placeholder="Telefone"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full border border-border p-2 rounded bg-transparent"
        />
        <textarea
          name="bio"
          placeholder="Descrição da empresa (opcional)"
          value={formData.bio}
          onChange={handleChange}
          className="w-full border border-border p-2 rounded bg-transparent"
        />
        <Button
          type="submit"
          disabled={loading}
          variant="primary"
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </Button>
      </form>
    </div>
  );
}
