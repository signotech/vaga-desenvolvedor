import PrimaryButton from "@/Components/PrimaryButton"
import VagaPod from "@/Components/VagaPod"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Link, useForm } from "@inertiajs/inertia-react"
import Paginator from "./Partials/Paginator"
import InputLabel from "@/Components/InputLabel"
import TextInput from "@/Components/TextInput"

export default function Index(props) {
    const vagas = props.vagas.data
    const links = props.vagas.links
    const candidato = props.candidato

    const vaga = props.vaga ? {...props.vaga} : {
        nome : '',
        tipo: 'CLT'
    }

    const { data, setData, get } = useForm(vaga);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        get(route('vagas.index'));
    };
    
    return (
        <AuthenticatedLayout auth={props.auth}>
            <div className="flex flex-col place-items-center p-5">
                <div className="flex flex-col space-y-3 w-3/5">
                    <div>
                        <div className="p-5 rounded-md bg-slate-300 space-y-5">
                            <form className="space-x-5 flex justify-between items-center" onSubmit={submit}>
                                <div>
                                    <InputLabel forInput="nome" value="Nome"/>
                                    <TextInput className="mt-1" type="text" name="nome" id="nome" value={data.nome} handleChange={onHandleChange}/>
                                </div>

                                <div>
                                    <InputLabel forInput="tipo" value="Tipo"/>
                                    <select value={data.tipo} name="tipo" id="tipo" className='mt-1 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm' onChange={onHandleChange}>
                                        <option value="CLT">CLT</option>
                                        <option value="PJ">PJ</option>
                                        <option value="Freelancer">Freelancer</option>
                                    </select>
                                </div>
                                <PrimaryButton className="h-fit">
                                    Buscar
                                </PrimaryButton>
                            </form>
                            {!candidato &&
                                <Link as='div' className="active:none sticky top-1" href={route('vagas.create')}>
                                    <PrimaryButton className="w-full place-content-center text-xl">Nova Vaga</PrimaryButton>
                                </Link>
                            }
                        </div>
                    </div>
                    {vagas.map((vaga) => (
                        <VagaPod showButtons={candidato} candidatado={vaga.candidatado} vaga={vaga}/>
                    ))}
                </div>
            </div>
            <Paginator links={links}/>
        </AuthenticatedLayout>
    )
}