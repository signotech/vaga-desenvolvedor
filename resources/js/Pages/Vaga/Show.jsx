import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Link } from "@inertiajs/inertia-react"
import DangerButton from "@/Components/DangerButton"
import SecondaryButton from "@/Components/SecondaryButton"
import CandidatarButton from "@/Components/CandidatarButton"

export default function Show(props) {
    const vaga = props.vaga
    const candidato = props.candidato

    return (
        <AuthenticatedLayout auth={props.auth}>
            <div className="flex place-content-center">
                <div className="flex flex-col-reverse lg:flex-row p-5 w-full lg:w-3/5 space-y-reverse space-y-5 lg:space-x-5">
                    <div className="flex flex-1 flex-col space-y-5">
                        <h1 className="text-3xl">{vaga.nome}</h1>
                        <hr/>
                        <div>{vaga.descricao}</div>
                        {!candidato && <>
                            <hr/>
                            <h1 className="text-xl">Candidatos</h1>
                            {vaga.candidatos.map((candidato) => (
                                <div className="shadow rounded-md border p-5 flex place-content-between space-x-14">
                                    <div className="w-3/4">
                                        <div className="text-xl">{candidato.name}</div>
                                        <div className="truncate text-gray-500">{candidato.email}</div>
                                    </div>
                                </div>
                            ))}
                        </>}
                    </div>
                    <div className="shadow-inner bg-slate-200 rounded-md w-full lg:w-fit h-fit p-5 space-y-1">
                        Contratação: <div className="inline font-bold">{vaga.tipo}</div>
                        <div className="space-x-3">
                            {candidato ? 
                                <CandidatarButton vaga={vaga} candidatado={vaga.candidatado} />
                            : <div className="space-x-3 flex">
                                <Link className="flex-1" href={route('vagas.edit', vaga.id)}>
                                    <SecondaryButton className="w-full place-content-center">
                                        Editar
                                    </SecondaryButton>
                                </Link>
                                <Link className="flex-1" method="delete" href={route('vagas.destroy', vaga.id)}>
                                    <DangerButton className="w-full place-content-center">
                                        Deletar
                                    </DangerButton>
                                </Link>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}