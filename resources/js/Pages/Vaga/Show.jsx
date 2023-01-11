import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Link } from "@inertiajs/inertia-react"
import DangerButton from "@/Components/DangerButton"
import SecondaryButton from "@/Components/SecondaryButton"

export default function Show(props) {
    const vaga = props.vaga
    return (
        <AuthenticatedLayout auth={props.auth}>
            <div className="flex place-content-center">
                <div className="flex flex-col lg:flex-row p-5 lg:w-3/5 space-y-5">
                    <div className="flex flex-1 flex-col space-y-5">
                        <div className="space-x-3">
                            <Link method="delete" href={route('vagas.destroy', vaga.id)}>
                                <DangerButton>
                                    Deletar
                                </DangerButton>
                            </Link>
                            <Link href={route('vagas.edit', vaga.id)}>
                                <SecondaryButton>
                                    Editar
                                </SecondaryButton>
                            </Link>
                        </div>
                        <h1 className="text-3xl">{vaga.nome}</h1>
                        <hr/>
                        <div>{vaga.descricao}</div>
                    </div>
                    <div className="shadow-inner bg-slate-200 rounded-md h-fit p-5">
                        Contratação: <div className="inline font-bold">{vaga.tipo}</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}