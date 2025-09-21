"use client";
import { useEffect, useState } from "react";

type Vaga = {
  id: number;
  titulo: string;
  tipo: string;
  status: "ativa" | "pausada";
};
type Candidato = { id: number; nome: string; email: string; vagas?: Vaga[] };
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost/api";

export default function CandidatosPage() {
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [vagaIds, setVagaIds] = useState<number[]>([]);
  const [submitting, setSubmitting] = useState(false);

  // erros de validação
  const [errors, setErrors] = useState<{
    nome?: string;
    email?: string;
    vagas?: string;
  }>({});

  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<"id" | "nome" | "email" | "created_at">(
    "id"
  );
  const [dir, setDir] = useState<"asc" | "desc">("asc");
  const [meta, setMeta] = useState<{
    current_page: number;
    last_page: number;
  } | null>(null);

  const load = async () => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    params.set("page", String(page));
    params.set("sort", sortBy);
    params.set("dir", dir);
    params.set("per_page", "20");

    const [candRes, vagaRes] = await Promise.all([
      fetch(`${API}/candidatos?${params.toString()}`).then((r) => r.json()),
      fetch(`${API}/vagas`).then((r) => r.json()),
    ]);
    setCandidatos(candRes.data || []);
    setMeta({
      current_page: candRes.current_page,
      last_page: candRes.last_page,
    });
    setVagas(
      (vagaRes.data || vagaRes || []).filter(
        (v: Vaga) => v.status !== "pausada"
      )
    );
  };

  useEffect(() => {
    load().catch(console.error);
  }, [page, sortBy, dir]);

  const toggleVaga = (id: number) => {
    setVagaIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // validações
  const isValidEmail = (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

  const validateForm = () => {
    const nextErrors: { nome?: string; email?: string; vagas?: string } = {};
    if (!nome.trim()) nextErrors.nome = "Nome é obrigatório.";
    if (!email.trim()) nextErrors.email = "Email é obrigatório.";
    else if (!isValidEmail(email))
      nextErrors.email = "Informe um email válido.";
    if (vagaIds.length === 0) nextErrors.vagas = "Selecione ao menos uma vaga.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const criarCandidato = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSubmitting(true);
      const res = await fetch(`${API}/candidatos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nome.trim(),
          email: email.trim(),
          vaga_ids: vagaIds,
        }),
      });
      if (!res.ok) {
        const msg = await res.text().catch(() => "");
        alert(`Erro ao criar candidato${msg ? `: ${msg}` : ""}`);
        return;
      }
      // sucesso: limpa form e recarrega
      setNome("");
      setEmail("");
      setVagaIds([]);
      setErrors({});
      setPage(1);
      await load();
    } finally {
      setSubmitting(false);
    }
  };

  const deletar = async (id: number) => {
    if (!confirm("Excluir candidato?")) return;
    const res = await fetch(`${API}/candidatos/${id}`, { method: "DELETE" });
    if (!res.ok) return alert("Erro ao excluir");
    await load();
  };

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <div className="flex gap-3 items-end flex-wrap">
          <div>
            <label className="block text-sm font-medium">Buscar</label>
            <input
              className="border p-2 rounded-md"
              placeholder="nome ou email..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm">Ordenar</label>
            <div className="flex gap-2">
              <select
                className="border p-2 rounded-md"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="id">ID</option>
                <option value="nome">Nome</option>
                <option value="email">Email</option>
                <option value="created_at">Criado em</option>
              </select>
              <select
                className="border p-2 rounded-md"
                value={dir}
                onChange={(e) => setDir(e.target.value as any)}
              >
                <option value="asc">asc</option>
                <option value="desc">desc</option>
              </select>
            </div>
          </div>
          <button
            onClick={() => {
              setPage(1);
              load();
            }}
            className="px-4 py-2 rounded-md bg-black text-white"
          >
            Aplicar
          </button>
        </div>
      </div>

      <form
        onSubmit={criarCandidato}
        className="rounded-2xl border bg-white p-4 shadow-sm max-w-xl space-y-4"
        noValidate
      >
        <h2 className="font-semibold">Novo candidato</h2>
        <div>
          <label className="block text-sm font-medium">Nome</label>
          <input
            className={`border p-2 rounded-md w-full ${
              errors.nome ? "border-red-500" : ""
            }`}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            aria-invalid={!!errors.nome}
          />
          {errors.nome && (
            <p className="mt-1 text-sm text-red-600">{errors.nome}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className={`border p-2 rounded-md w-full ${
              errors.email ? "border-red-500" : ""
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Inscrever em vagas ativas
          </label>
          <div
            className={`max-h-56 overflow-auto border rounded-md bg-white ${
              errors.vagas ? "border-red-500" : ""
            }`}
          >
            {vagas.map((v) => (
              <label
                key={v.id}
                className="flex items-center gap-2 px-3 py-2 border-b last:border-b-0"
              >
                <input
                  type="checkbox"
                  checked={vagaIds.includes(v.id)}
                  onChange={() => toggleVaga(v.id)}
                />
                <span>
                  #{v.id} {v.titulo} ({v.tipo})
                </span>
              </label>
            ))}
            {vagas.length === 0 && (
              <div className="p-3 text-gray-500">Nenhuma vaga ativa</div>
            )}
          </div>
          {errors.vagas && (
            <p className="mt-1 text-sm text-red-600">{errors.vagas}</p>
          )}
        </div>
        <button
          className="px-4 py-2 rounded-md bg-black text-white disabled:opacity-60"
          disabled={submitting}
        >
          {submitting ? "Salvando..." : "Salvar"}
        </button>
      </form>

      <div className="rounded-2xl border bg-white p-0 overflow-hidden shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-3 border-b">ID</th>
              <th className="p-3 border-b">Nome</th>
              <th className="p-3 border-b">Email</th>
              <th className="p-3 border-b">Vagas</th>
              <th className="p-3 border-b">Ações</th>
            </tr>
          </thead>
          <tbody>
            {candidatos.map((c) => (
              <tr key={c.id} className="odd:bg-white even:bg-gray-50">
                <td className="p-3 border-b">{c.id}</td>
                <td className="p-3 border-b">{c.nome}</td>
                <td className="p-3 border-b">{c.email}</td>
                <td className="p-3 border-b">
                  {(c.vagas || [])
                    .map((v) => `#${v.id} ${v.titulo}`)
                    .join(", ")}
                </td>
                <td className="p-3 border-b">
                  <button
                    onClick={() => deletar(c.id)}
                    className="px-3 py-1 rounded-md border border-red-200 text-red-600 hover:bg-red-50"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
            {candidatos.length === 0 && (
              <tr>
                <td className="p-4 text-center text-gray-500" colSpan={5}>
                  Nenhum candidato
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {meta && (
        <div className="flex items-center gap-2">
          <button
            disabled={meta.current_page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span>
            Página {meta.current_page} de {meta.last_page}
          </span>
          <button
            disabled={meta.current_page >= meta.last_page}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
}
