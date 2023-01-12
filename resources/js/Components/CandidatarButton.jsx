import { useForm } from "@inertiajs/inertia-react"
import DangerButton from "./DangerButton";
import PrimaryButton from "./PrimaryButton";

export default function CandidatarButton(props) {
    const candidatado = props.candidatado
    const vaga = props.vaga

    const { post, delete : destroy } = useForm({vaga_id : vaga.id});

    function onDelete(e) {
        e.stopPropagation()
        destroy(route('candidaturas.destroy', vaga.id))
    }

    function onCandidatar(e) {
        e.stopPropagation()
        post(route('candidaturas.store'))
    }

    return (
        <> {
            candidatado ?
                <DangerButton className="flex-1 place-content-center" onClick={onDelete}>
                    Cancelar
                </DangerButton>
            :
                <PrimaryButton className="flex-1 place-content-center" onClick={onCandidatar}>
                    Candidatar-se
                </PrimaryButton>
        } </>
    )
}