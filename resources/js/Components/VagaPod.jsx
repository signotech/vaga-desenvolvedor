import { Link } from "@inertiajs/inertia-react"

export default function VagaPod(props) {
    const vaga = props.vaga
    return (
        <Link className="shadow rounded-md border p-5" as='div' href={route('vagas.show', vaga.id)}>
            <div className="text-xl">{vaga.nome}</div>
            <div className="truncate w-3/4 text-gray-500">{vaga.descricao}</div>
        </Link>
    )
}