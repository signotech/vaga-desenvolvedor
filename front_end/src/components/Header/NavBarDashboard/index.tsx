import { useState } from 'react';
import { Link } from 'react-router-dom';
import MobileMenu from '../MobileMenu';
const NavBarDashboard = () => {

   const [isMenuOpen, setMenuOpen] = useState(false);
   
   const opemMenu = () =>{
      setMenuOpen(!isMenuOpen)
   }
   return (
      <>
         <nav className="light-blue darken-4">
            <div className="nav-wrapper container max-width-1200">
               <Link to="/" className="brand-logo">
                  Kali System
               </Link>
               <a href="#!" className="sidenav-trigger" data-target="mobile-menu" onClick={opemMenu}>
                  <i className=" Tiny material-icons ">{isMenuOpen ? "close" : "drag_handle"}</i>
               </a>
               <ul className="right hide-on-med-and-down">
                  <li>
                     <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                     <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                     <Link to="/settings">Settings</Link>
                  </li>
               </ul>
            </div>
         </nav>

      < MobileMenu isMenuOpen={isMenuOpen}/>
      </>
   );
};

export default NavBarDashboard;
