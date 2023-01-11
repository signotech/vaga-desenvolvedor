import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Link } from "@inertiajs/inertia-react"

export default function Index(props) {
    const vagas = props.vagas
    return (
        <AuthenticatedLayout auth={props.auth}>
            <div className="flex flex-col place-items-center p-5">
                <div className="flex flex-col space-y-3 w-3/5">
                    {vagas.map((vaga) => (
                        <Link className="shadow rounded-md border p-5" as='div' href={route('vagas.show', vaga.id)}>
                            <div className="text-xl">{vaga.nome}</div>
                            <div className="truncate w-3/4 text-gray-500">{vaga.descricao}</div>
                        </Link>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    )
}