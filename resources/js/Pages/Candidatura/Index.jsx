import VagaPod from "@/Components/VagaPod"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import Paginator from "../Vaga/Partials/Paginator";

export default function Index(props) {
    const vagas = props.vagas.data
    const links = props.vagas.links
    const params = {}

    return (
        <AuthenticatedLayout auth={props.auth}>
            <div className="flex flex-col place-items-center p-5">
                <div className="flex flex-col space-y-3 w-3/5">
                    {vagas.map((vaga) => (
                        <VagaPod key={vaga.id} vaga={vaga} candidatado={true}/>
                    ))}
                </div>
            </div>
            <Paginator params={params} links={links}/>
        </AuthenticatedLayout>
    )
}