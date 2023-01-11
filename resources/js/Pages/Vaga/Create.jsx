import PrimaryButton from '@/Components/PrimaryButton'
import { useForm } from '@inertiajs/inertia-react';

export default function Create(props) {
    const { data, setData, post, processing } = useForm({
        nome : '',
        descricao : '',
        tipo: 'CLT',
        user_id : props.auth.user.id
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('vagas.store'));
    };

    return (
        <form className="edit flex flex-col p-5 space-y-5" onSubmit={submit}>
            <label htmlFor="nome">Nome:</label>
            <input type="text" name="nome" id="nome" value={data.nome} onChange={onHandleChange}/>

            <label htmlFor="descricao">Descrição:</label>
            <textarea name="descricao" id="descricao" cols="30" rows="10" onChange={onHandleChange} value={data.descricao}/>

            <label htmlFor="tipo">Tipo:</label>
            <select name="tipo" id="tipo" onChange={onHandleChange}>
                <option value="CLT">CLT</option>
                <option value="PJ">PJ</option>
            </select>
            <PrimaryButton processing={processing}>
                Criar
            </PrimaryButton>
        </form>
    );
}
