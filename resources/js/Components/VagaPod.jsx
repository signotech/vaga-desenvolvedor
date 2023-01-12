import { Link, useForm } from "@inertiajs/inertia-react"
import DangerButton from "./DangerButton";
import PrimaryButton from "./PrimaryButton";
import { Inertia } from '@inertiajs/inertia'

export default function VagaPod(props) {
    const vaga = props.vaga
    const candidatado = props.candidatado
    const empresa = props.showButtons === undefined ? true : props.showButtons
    const { post, delete : destroy } = useForm({vaga_id : vaga.id});

    function onDelete(e) {
        e.stopPropagation()
        console.log(vaga.id)
        destroy(route('candidaturas.destroy', vaga.id))
    }

    function onCandidatar(e) {
        e.stopPropagation()
        post(route('candidaturas.store'))
    }

    function onTogglePausada(e) {
        e.stopPropagation()
        vaga.pausada = !vaga.pausada
        Inertia.put(route('vagas.update', vaga.id), vaga)
    }

    return (
        <Link className="shadow rounded-md border p-5 flex place-content-between space-x-14" as='div' href={route('vagas.show', vaga.id)}>
            <div className="w-3/4">
                <div className="text-xl">{vaga.nome}</div>
                <div className="truncate text-gray-500">{vaga.descricao}</div>
            </div>
            {empresa ? <>
                {candidatado ?
                    <DangerButton className="flex-1 place-content-center" onClick={onDelete}>
                        Cancelar
                    </DangerButton>
                :
                    <PrimaryButton className="flex-1 place-content-center" onClick={onCandidatar}>
                        Candidatar-se
                    </PrimaryButton>
                }
            </> : <>
                {vaga.pausada ?
                    <PrimaryButton className="flex-1 place-content-center" onClick={onTogglePausada}>
                        Ativar
                    </PrimaryButton>
                :
                    <DangerButton className="flex-1 place-content-center" onClick={onTogglePausada}>
                        Pausar
                    </DangerButton>
                }
            </>}
        </Link>
    )
}