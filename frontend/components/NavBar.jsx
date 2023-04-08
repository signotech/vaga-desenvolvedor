import './NavBar.css'
import { Link } from 'react-router-dom'

export const NavBar = () => {
    return(
        <nav className="NavBar">
            <div className="align">

            
            <h1>Menu</h1>
            <ul>
                <li>
                    <Link to="/clientes">Clientes</Link>
                </li>
                
                <li>
                    <Link to="/produtos">Produtos</Link>
                </li>
                
                <li>
                    <Link to="/pedidos">Pedidos</Link>
                </li>
            </ul>   </div>
        </nav>
    )
}