import VagaPod from "@/Components/VagaPod"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"

export default function Index(props) {
    const vagas = props.vagas
    return (
        <AuthenticatedLayout auth={props.auth}>
            <div className="flex flex-col place-items-center p-5">
                <div className="flex flex-col space-y-3 w-3/5">
                    {vagas.map((vaga) => (
                        <VagaPod vaga={vaga}/>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    )
}