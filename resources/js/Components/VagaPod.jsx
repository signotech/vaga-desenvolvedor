import { Link } from "@inertiajs/inertia-react"
import CandidatarButton from "./CandidatarButton";
import PausarButton from "./PausarButton";

export default function VagaPod(props) {
    const vaga = props.vaga
    const candidatado = props.candidatado
    const empresa = props.showButtons === undefined ? true : props.showButtons

    return (
        <Link className="shadow rounded-md border p-5 flex place-content-between space-x-14" as='div' href={route('vagas.show', vaga.id)}>
            <div className="w-3/4">
                <div className="text-xl">{vaga.nome}</div>
                <div className="truncate text-gray-500">{vaga.descricao}</div>
            </div>
            {empresa ? <>
                <CandidatarButton vaga={vaga} candidatado={candidatado}/>
            </> : <>
                <PausarButton vaga={vaga}/>
            </>}
        </Link>
    )
}