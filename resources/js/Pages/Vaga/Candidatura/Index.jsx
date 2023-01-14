import VagaPod from "@/Components/VagaPod"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import Paginator from "../../../Components/Paginator"
import VagaFilter from "../Partials/VagaFilter"

export default function Index(props) {
    const vagas = props.vagas.data
    const links = props.vagas.links

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
                        <VagaFilter params={params}/>
                    </div>
                    {vagas.map((vaga) => (
                        <VagaPod key={vaga.id} vaga={vaga} candidatado={true}/>
                    ))}
                </div>
            </div>
            <Paginator params={params} links={links}/>
        </AuthenticatedLayout>
    )
}