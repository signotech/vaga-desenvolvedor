import { Link } from "@inertiajs/inertia-react"
import CandidatarButton from "./CandidatarButton";
import PausarButton from "./PausarButton";

export default function VagaPod(props) {
    const vaga = props.vaga
    const candidatado = props.candidatado
    const empresa = props.showButtons === undefined ? true : props.showButtons

    return (
        <Link className="shadow rounded-md border p-5 flex place-content-between space-y-5 lg:space-x-5 xl:space-x-14 flex-col md:flex-row" as='div' href={route('vagas.show', vaga.id)}>
            <div className="md:w-3/4">
                <div className="lg:text-xl truncate">{vaga.nome}</div>
                <div className="truncate text-gray-500 text-sm lg:text-base">{vaga.descricao}</div>
            </div>
            {empresa ? <>
                <CandidatarButton vaga={vaga} candidatado={candidatado}/>
            </> : <>
                <PausarButton vaga={vaga}/>
            </>}
        </Link>
    )
}