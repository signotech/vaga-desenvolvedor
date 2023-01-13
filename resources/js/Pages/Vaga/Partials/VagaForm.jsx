import PrimaryButton from '@/Components/PrimaryButton'
import { useForm } from '@inertiajs/inertia-react'
import TextInput from '@/Components/TextInput'
import InputLabel from '@/Components/InputLabel'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import InputError from '@/Components/InputError'

export default function VagaForm(props) {
    const vaga = props.vaga ? {...props.vaga} : {
        nome : '',
        descricao : '',
        tipo: 'CLT',
        user_id : props.auth.user.id,
        pausada : false
    }

    const { data, setData, post, put, processing, errors } = useForm(vaga);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        if (props.vaga) {
            put(route('vagas.update', vaga.id));
        }
        else {
            post(route('vagas.store'));
        }
    };

    return (
        <AuthenticatedLayout auth={props.auth}>
            <form className="edit flex flex-col p-5 space-y-5 place-items-center" onSubmit={submit}>
                <div className='w-3/5'>
                    <InputLabel forInput="nome" value="Nome"/>
                    <TextInput className="mt-1 block w-full" type="text" name="nome" id="nome" value={data.nome} handleChange={onHandleChange}/>
                    <InputError message={errors.nome} className="mt-2" />
                </div>

                <div className='w-3/5'>
                    <InputLabel forInput="tipo" value="Tipo"/>
                    <select value={data.tipo} name="tipo" id="tipo" className='w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm' onChange={onHandleChange}>
                        <option value="CLT">CLT</option>
                        <option value="PJ">PJ</option>
                        <option value="Freelancer">Freelancer</option>
                    </select>
                    <InputError message={errors.tipo} className="mt-2" />
                </div>

                <div className='w-3/5'>
                    <InputLabel forInput="descricao" value="Descrição"/>
                    <textarea className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full" name="descricao" id="descricao" cols="30" rows="10" onChange={onHandleChange} value={data.descricao}/>
                    <InputError message={errors.descricao} className="mt-2" />
                </div>

                <PrimaryButton processing={processing}>
                    Salvar
                </PrimaryButton>
            </form>
        </AuthenticatedLayout>
    );
}
