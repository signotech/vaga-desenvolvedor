"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/app/components/ui/button";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    portfolio: "",
    resumeUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [userId, setUserId] = useState(null);

  // Get user id from localStorage
  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) setUserId(id);
  }, []);

  // Fetch user data
  useEffect(() => {
    if (!userId) return;
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`/api/user/${userId}`);
        setUser(data.user);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  // Set form data
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
        portfolio: user.portfolio || "",
        resumeUrl: user.resumeUrl || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Upload resume to supabase
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return null;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`/api/upload`, { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok) {
        setForm((prev) => ({ ...prev, resumeUrl: data.url }));
      } else {
        console.error("Erro ao enviar arquivo:", data);
      }
    } catch (error) {
      console.error("Erro ao enviar arquivo:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`/api/user/${userId}`, form);
      setEditing(false);
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
    }
  };

  if (loading) return <p className="p-6 text-muted">Carregando perfil...</p>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold text-primary mb-8">
        {user?.name || "Perfil"}
      </h1>

      <div className="space-y-5">
        {["name", "email", "phone", "bio", "portfolio"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-foreground mb-1">
              {field === "name"
                ? "Nome"
                : field === "email"
                ? "E-mail"
                : field === "phone"
                ? "Telefone"
                : field === "bio"
                ? "Biografia"
                : "Portfólio"}
            </label>

            {field === "bio" ? (
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                disabled={!editing}
                rows={4}
                placeholder="Conte um pouco sobre você..."
                className={`w-full border border-border rounded-md p-2 bg-background-secondary text-muted resize-none ${
                  !editing && "opacity-70 cursor-not-allowed"
                }`}
              />
            ) : (
              <input
                type="text"
                name={field}
                value={form[field]}
                onChange={handleChange}
                disabled={!editing}
                className={`w-full border border-border rounded-md p-2 bg-background-secondary text-muted ${
                  !editing && "opacity-70 cursor-not-allowed"
                }`}
              />
            )}
          </div>
        ))}

        {/* Resume upload */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Currículo (PDF)
          </label>
          {form.resumeUrl ? (
            <a
              href={`${form.resumeUrl}?fl_attachment`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Visualizar currículo
            </a>
          ) : (
            <p className="text-muted text-sm mb-2">Nenhum arquivo enviado</p>
          )}

          {editing && (
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="text-sm text-muted"
            />
          )}
          {uploading && <p className="text-sm text-muted mt-1">Enviando...</p>}
        </div>

        <div className="flex justify-end gap-3 mt-8">
          {!editing ? (
            <Button
              onClick={() => setEditing(true)}
              className="bg-primary text-white"
            >
              Editar
            </Button>
          ) : (
            <>
              <Button
                onClick={handleSave}
                className="bg-green-600 text-white hover:bg-green-700"
              >
                Salvar
              </Button>
              <Button
                onClick={() => {
                  setEditing(false);
                  setForm({
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    bio: user.bio,
                    portfolio: user.portfolio,
                    resumeUrl: user.resumeUrl,
                  });
                }}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                Cancelar
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
