import PrimaryButton from "@/Components/PrimaryButton"
import VagaPod from "@/Components/VagaPod"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Link } from "@inertiajs/inertia-react"
import Paginator from "../../Components/Paginator"
import VagaFilter from "./Partials/VagaFilter"

export default function Index(props) {
    const vagas = props.vagas.data
    const links = props.vagas.links
    const candidato = props.candidato

    const params = props.params ? {
        nome : props.params.nome,
        tipo : props.params.tipo,
        ordenar : props.params.ordenar ,
        quantidade : props.params.quantidade
    } : {
        nome : '',
        tipo : '',
        ordenar : 'nome',
        quantidade : 20
    }
    
    return (
        <AuthenticatedLayout auth={props.auth}>
            <div className="flex flex-col place-items-center p-5">
                <div className="flex flex-col space-y-3 w-3/5">
                    <div>
                        <VagaFilter params={params}>
                            {!candidato &&
                                <Link as='div' className="active:none sticky top-1" href={route('vagas.create')}>
                                    <PrimaryButton className="w-full place-content-center text-xl">Nova Vaga</PrimaryButton>
                                </Link>
                            }
                        </VagaFilter>
                    </div>
                    {vagas.map((vaga) => (
                        <VagaPod showButtons={candidato} candidatado={vaga.candidatado} vaga={vaga}/>
                    ))}
                </div>
            </div>
            <Paginator params={params} links={links}/>
        </AuthenticatedLayout>
    )
}