export default function Edit(props) {
    const vaga = props.vaga
    return (
        <div className="edit flex flex-col p-5">
            <label htmlFor="nome">Nome:</label>
            <input type="text" name="nome" id="nome" value={vaga.nome}/>

            <label htmlFor="descricao">Descrição:</label>
            <textarea name="descricao" id="descricao" cols="30" rows="10">{vaga.descricao}</textarea>

            <label htmlFor="tipo">Tipo:</label>
            <select name="tipo" id="tipo">
                <option value="CLT">CLT</option>
                <option value="PJ">PJ</option>
            </select>
        </div>
    )
}