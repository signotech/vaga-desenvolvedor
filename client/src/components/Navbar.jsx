import M from  'materialize-css/dist/js/materialize.min.js';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function NavLinks() {
    return (
        <>
            <li><Link to="/clientes">Clientes</Link></li>
            <li><Link to="/produtos">Produtos</Link></li>
        </>
    )
}

export default function Navbar() {
    const sliderRef = useRef('sliderRef');

    useEffect(() => {
        M.Sidenav.init(sliderRef.current);
    })
    

    return (
        <>
            <nav className='blue darken-1'>
                <div className="nav-wrapper">
                    <a href="#!" className="brand-logo">Logo</a>
                    <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                        <NavLinks />
                    </ul>
                </div>
            </nav>

            <ul className="sidenav" id="mobile-demo" ref={sliderRef}>
                <NavLinks />
            </ul>
        </>
    )
}