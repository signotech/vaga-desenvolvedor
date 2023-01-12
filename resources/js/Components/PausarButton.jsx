import { Inertia } from '@inertiajs/inertia'
import DangerButton from "./DangerButton";
import PrimaryButton from "./PrimaryButton";

export default function PausarButton(props) {
    const vaga = props.vaga

    function onTogglePausada(e) {
        e.stopPropagation()
        vaga.pausada = !vaga.pausada
        Inertia.put(route('vagas.update', vaga.id), vaga)
    }

    return (
        <> {vaga.pausada ?
            <PrimaryButton className="flex-1 place-content-center" onClick={onTogglePausada}>
                Ativar
            </PrimaryButton>
        :
            <DangerButton className="flex-1 place-content-center" onClick={onTogglePausada}>
                Pausar
            </DangerButton>
        } </>
    )
}