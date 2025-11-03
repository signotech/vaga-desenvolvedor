"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/app/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function CompanyProfilePage() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
  });
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

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
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`/api/user/${userId}`, form);
      setEditing(false);
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = confirm(
      "Tem certeza que deseja excluir sua conta? Essa ação é irreversível."
    );
    if (!confirmDelete) return;

    try {
      setDeleting(true);
      await axios.delete(`/api/user/${userId}`);
      localStorage.clear();
      router.push("/");
    } catch (error) {
      console.error("Erro ao excluir conta:", error);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <p className="p-6 text-muted">Carregando perfil...</p>;

  return (

    <div className="max-w-3xl mx-auto py-10 px-6">
      <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-muted hover:text-primary transition mb-4"
          >
            <ArrowLeft size={18} />
            Voltar
          </button>
      <h1 className="text-3xl font-bold text-primary mb-8">
        {user?.name || "Perfil da Empresa"}
      </h1>

      <div className="space-y-5">
        {["name", "email", "phone", "bio"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-foreground mb-1">
              {field === "name"
                ? "Nome da empresa"
                : field === "email"
                ? "E-mail"
                : field === "phone"
                ? "Telefone"
                : "Descrição / Biografia"}
            </label>

            {field === "bio" ? (
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                disabled={!editing}
                rows={4}
                placeholder="Fale brevemente sobre sua empresa..."
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

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-8">
          <div className="flex gap-3">
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
                    });
                  }}
                  className="bg-red-600 text-white hover:bg-red-700"
                >
                  Cancelar
                </Button>
              </>
            )}
          </div>

          {/* Delete account */}
          <Button
            onClick={handleDeleteAccount}
            disabled={deleting}
            variant="danger"
          >
            {deleting ? "Excluindo..." : "Excluir conta"}
          </Button>
        </div>
      </div>
    </div>
  );
}
