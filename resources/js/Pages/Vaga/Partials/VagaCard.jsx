export default function VagaCard(props) {
    const vaga = props.vaga

    return (
        <div className={"shadow-inner bg-slate-200 rounded-md w-full lg:w-fit h-fit p-5 space-y-1 " + props.className}>
            Contratação: <div className="inline font-bold">{vaga.tipo}</div> <br/>
            Empresa: <div className="inline font-bold">{vaga.criador.name}</div>
            <div className="space-x-3">
                {props.children}
            </div>
        </div>
    )
}