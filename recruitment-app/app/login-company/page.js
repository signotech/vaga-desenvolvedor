"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";

export default function LoginCompany() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "COMPANY",
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ type: "", message: "" });
    setLoading(true);

    try {
      const res = await axios.post("/api/login", {
        email: formData.email,
        password: formData.password,
      });

      const { token, user, message } = res.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", user.role);

      setAlert({ type: "success", message });

      setTimeout(() => {
        router.push("/dashboard/company");
      }, 1000);
    } catch (err) {
      const message = err.response?.data?.message || "Erro ao realizar login";
      setAlert({ type: "error", message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid place-items-center min-h-[75vh]">
      <div className="max-w-md mx-auto bg-background-secondary border border-border p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-primary">
          Login Empresa
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
          <Button
            type="submit"
            disabled={loading}
            variant="primary"
            className="w-full py-2 transition"
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <p className="text-sm text-center text-foreground mt-4">
          Ainda não tem conta?{" "}
          <a href="/register-company" className="text-primary hover:underline">
            Cadastre-se
          </a>
        </p>
      </div>
    </div>
  );
}
