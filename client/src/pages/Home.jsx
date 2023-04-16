import Title from "../components/Title";
import { Link } from "react-router-dom";
import Row from "../components/Row";

export default function Home() {
    return (
        <>
            <Title>Início</Title>
                <div className="home-links">
                    <Link className="btn col light-blue darken-3 m3 s12" to="/clientes">Buscar clientes</Link>
                    <Link className="btn col light-blue darken-3 m3 s12" to="/clientes/novo">Adicionar clientes</Link>
                    <Link className="btn col green darken-2 m3 s12" to="/produtos">Buscar produtos</Link>
                    <Link className="btn col green darken-2 m3 s12" to="/produtos/novo">Adicionar produtos</Link>
                </div>
        </>
    )
}