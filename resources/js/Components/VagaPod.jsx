import { Link, useForm } from "@inertiajs/inertia-react"
import PrimaryButton from "./PrimaryButton";

export default function VagaPod(props) {
    const vaga = props.vaga
    const { post } = useForm({vaga_id : vaga.id});

    const submit = (e) => {
        e.preventDefault();
        post(route('candidaturas.store'));
    };

    return (
        <form onSubmit={submit}>
            <Link className="shadow rounded-md border p-5" as='div' href={route('vagas.show', vaga.id)}>
                <div className="text-xl">{vaga.nome}</div>
                <div className="truncate w-3/4 text-gray-500">{vaga.descricao}</div>
                <PrimaryButton className="z-50" onClick={(e) => e.stopPropagation()}>
                    Candidatar-se
                </PrimaryButton>
            </Link>
        </form>
    )
}