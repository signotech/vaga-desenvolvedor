import React from 'react';
import { Link } from 'react-router-dom';
import './scss/nav.scss';

interface NavItem {
  label: string;
  route: string;
}

interface NavBarProps {
  menuItems: NavItem[];
}

const Nav: React.FC<NavBarProps> = ({ menuItems }) => {
  return (
    <nav className="nav-bar">
      <div className="nav-bar-menu">
        {menuItems.map((item) => (
          <div key={item.route}>
            <Link to={item.route}>{item.label}</Link>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
