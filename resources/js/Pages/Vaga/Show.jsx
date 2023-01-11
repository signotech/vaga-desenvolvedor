import { Link } from "@inertiajs/inertia-react"

export default function Show(props) {
    const vaga = props.vaga
    return (
        <div className="flex flex-col space-y-1">
            <div>{vaga.nome}</div>
            <div>{vaga.descricao}</div>
            <div>{vaga.tipo}</div>
            <Link href={route('vagas.edit', vaga.id)}>Editar</Link>
            <Link method="delete" href={route('vagas.destroy', vaga.id)}>Delete</Link>
        </div>
    )
}