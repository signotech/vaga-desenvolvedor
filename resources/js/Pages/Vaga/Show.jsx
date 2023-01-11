export default function Show(props) {
    const vaga = props.vaga
    return (
        <div className="show">
            <div>{vaga.nome}</div>
            <div>{vaga.descricao}</div>
            <div>{vaga.tipo}</div>
        </div>
    )
}