import PrimaryButton from "@/Components/PrimaryButton"
import { useForm } from "@inertiajs/inertia-react"
import InputLabel from "@/Components/InputLabel"
import TextInput from "@/Components/TextInput"

export default function VagaFilter(props) {
    const params = props.params

    const { data, setData, get } = useForm(params);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        get(route(route().current()));
    };

    return (
        <div className="p-5 rounded-md bg-slate-300 space-y-5">
            <form className="space-y-5" onSubmit={submit}>
                <div className="w-full">
                    <InputLabel forInput="nome" value="Nome"/>
                    <TextInput className="mt-1 w-full" type="text" name="nome" id="nome" value={data.nome} handleChange={onHandleChange}/>
                </div>
                <div className="flex w-full space-x-5">

                    <div className="flex-1">
                        <InputLabel forInput="tipo" value="Tipo"/>
                        <select value={data.tipo} name="tipo" id="tipo" className='w-full mt-1 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm' onChange={onHandleChange}>
                            <option value="">Todos</option>
                            <option value="CLT">CLT</option>
                            <option value="PJ">PJ</option>
                            <option value="Freelancer">Freelancer</option>
                        </select>
                    </div>

                    <div className="flex-1">
                        <InputLabel forInput="ordenar" value="Ordenar por"/>
                        <select value={data.ordenar} name="ordenar" id="ordenar" className='w-full mt-1 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm' onChange={onHandleChange}>
                            <option value="nome">Nome</option>
                            <option value="tipo">Tipo</option>
                            <option value="created_at">Data</option>
                        </select>
                    </div>

                    <div className="flex-1">
                        <InputLabel forInput="quantidade" value="Itens por página"/>
                        <TextInput className="w-full mt-1" type="number" name="quantidade" id="quantidade" value={data.quantidade} handleChange={onHandleChange}/>
                    </div>
                </div>

                <PrimaryButton className="w-full place-content-center">
                    Buscar
                </PrimaryButton>
            </form>
            {props.children}
        </div>
    )
}