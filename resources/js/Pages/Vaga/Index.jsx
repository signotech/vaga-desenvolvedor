import { Link } from "@inertiajs/inertia-react"

export default function Index(props) {
    const vagas = props.vagas
    return (
        <div className="flex flex-col space-y-1">
            <Link href={route('vagas.create')}>Criar</Link>
            {vagas.map((vaga) => (
                <Link href={route('vagas.show', vaga.id)}>{vaga.nome}</Link>
            ))}
        </div>
    )
}