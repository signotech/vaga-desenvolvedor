"use client";
import { useEffect, useState } from "react";

type Vaga = {
  id: number;
  titulo: string;
  tipo: "CLT" | "PJ" | "Freelancer";
  status: "ativa" | "pausada";
};
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost/api";

export default function VagasPage() {
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [q, setQ] = useState("");
  const [tipo, setTipo] = useState("");
  const [status, setStatus] = useState("");
  const [titulo, setTitulo] = useState("");
  const [tipoNovo, setTipoNovo] = useState("CLT");

  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<
    "id" | "titulo" | "tipo" | "status" | "created_at"
  >("id");
  const [dir, setDir] = useState<"asc" | "desc">("asc");
  const [meta, setMeta] = useState<{
    current_page: number;
    last_page: number;
  } | null>(null);

  const [editId, setEditId] = useState<number | null>(null);
  const [editTitulo, setEditTitulo] = useState("");

  const load = async () => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (tipo) params.set("tipo", tipo);
    if (status) params.set("status", status);
    params.set("page", String(page));
    params.set("sort", sortBy);
    params.set("dir", dir);
    params.set("per_page", "20");

    const res = await fetch(`${API}/vagas?${params.toString()}`);
    const json = await res.json();
    setVagas(json.data || []);
    setMeta({ current_page: json.current_page, last_page: json.last_page });
  };

  useEffect(() => {
    load().catch(console.error);
  }, [page, sortBy, dir]);

  const criar = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${API}/vagas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo, tipo: tipoNovo, status: "ativa" }),
    });
    if (!res.ok) return alert("Erro ao criar vaga");
    setTitulo("");
    setTipoNovo("CLT");
    setPage(1);
    await load();
  };

  const alternarStatus = async (vaga: Vaga) => {
    const novo = vaga.status === "ativa" ? "pausada" : "ativa";
    const res = await fetch(`${API}/vagas/${vaga.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: novo }),
    });
    if (!res.ok) return alert("Erro ao atualizar status");
    await load();
  };

  const deletar = async (id: number) => {
    if (!confirm("Excluir vaga?")) return;
    const res = await fetch(`${API}/vagas/${id}`, { method: "DELETE" });
    if (!res.ok) return alert("Erro ao excluir");
    await load();
  };

  const salvarEdicao = async (id: number) => {
    const res = await fetch(`${API}/vagas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo: editTitulo }),
    });
    if (!res.ok) return alert("Erro ao editar");
    setEditId(null);
    setEditTitulo("");
    await load();
  };

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border bg-white p-4 shadow-sm space-y-3">
        <div className="flex gap-3 items-end flex-wrap">
          <div>
            <label className="block text-sm font-medium">Buscar</label>
            <input
              className="border p-2 rounded-md"
              placeholder="título..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Tipo</label>
            <select
              className="border p-2 rounded-md"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              <option value="">(todos)</option>
              <option value="CLT">CLT</option>
              <option value="PJ">PJ</option>
              <option value="Freelancer">Freelancer</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              className="border p-2 rounded-md"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">(todos)</option>
              <option value="ativa">Ativa</option>
              <option value="pausada">Pausada</option>
            </select>
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
                <option value="titulo">Título</option>
                <option value="tipo">Tipo</option>
                <option value="status">Status</option>
                <option value="created_at">Criada em</option>
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
        onSubmit={criar}
        className="rounded-2xl border bg-white p-4 shadow-sm max-w-xl space-y-3"
      >
        <h2 className="font-semibold">Nova vaga</h2>
        <input
          className="border p-2 rounded-md w-full"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <select
          className="border p-2 rounded-md w-full"
          value={tipoNovo}
          onChange={(e) => setTipoNovo(e.target.value)}
        >
          <option value="CLT">CLT</option>
          <option value="PJ">PJ</option>
          <option value="Freelancer">Freelancer</option>
        </select>
        <button className="px-4 py-2 rounded-md bg-black text-white">
          Salvar
        </button>
      </form>

      <div className="rounded-2xl border bg-white p-0 overflow-hidden shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-3 border-b">ID</th>
              <th className="p-3 border-b">Título</th>
              <th className="p-3 border-b">Tipo</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b">Ações</th>
            </tr>
          </thead>
          <tbody>
            {vagas.map((v) => (
              <tr key={v.id} className="odd:bg-white even:bg-gray-50">
                <td className="p-3 border-b">{v.id}</td>
                <td className="p-3 border-b">
                  {editId === v.id ? (
                    <input
                      className="border p-1 rounded"
                      value={editTitulo}
                      onChange={(e) => setEditTitulo(e.target.value)}
                    />
                  ) : (
                    v.titulo
                  )}
                </td>
                <td className="p-3 border-b">{v.tipo}</td>
                <td className="p-3 border-b">{v.status}</td>
                <td className="p-3 border-b">
                  <div className="flex gap-2">
                    {editId === v.id ? (
                      <>
                        <button
                          onClick={() => salvarEdicao(v.id)}
                          className="px-3 py-1 border rounded"
                        >
                          Salvar
                        </button>
                        <button
                          onClick={() => {
                            setEditId(null);
                            setEditTitulo("");
                          }}
                          className="px-3 py-1 border rounded"
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setEditId(v.id);
                            setEditTitulo(v.titulo);
                          }}
                          className="px-3 py-1 border rounded"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => alternarStatus(v)}
                          className="px-3 py-1 border rounded"
                        >
                          {v.status === "ativa" ? "Pausar" : "Ativar"}
                        </button>
                        <button
                          onClick={() => deletar(v.id)}
                          className="px-3 py-1 rounded-md border border-red-200 text-red-600 hover:bg-red-50"
                        >
                          Excluir
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {vagas.length === 0 && (
              <tr>
                <td className="p-4 text-center text-gray-500" colSpan={5}>
                  Nenhuma vaga
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
