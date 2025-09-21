import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-bold">Bem-vindo 👋</h1>
        <p className="text-gray-600 mt-2">
          Mini-sistema para gestão de vagas e candidatos (CRUD).
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/vagas"
            className="px-4 py-2 rounded-md bg-black text-white hover:opacity-90"
          >
            Ir para Vagas
          </Link>
          <Link
            href="/candidatos"
            className="px-4 py-2 rounded-md border hover:bg-gray-50"
          >
            Ir para Candidatos
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <Link
          href="/vagas"
          className="block rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition"
        >
          <h2 className="font-semibold text-lg">📄 Vagas</h2>
          <p className="text-gray-600 mt-1">
            Listar, criar, pausar/ativar e remover vagas.
          </p>
        </Link>

        <Link
          href="/candidatos"
          className="block rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition"
        >
          <h2 className="font-semibold text-lg">🧑‍💼 Candidatos</h2>
          <p className="text-gray-600 mt-1">
            Cadastrar candidatos e inscrevê-los em vagas.
          </p>
        </Link>
      </section>
    </div>
  );
}
