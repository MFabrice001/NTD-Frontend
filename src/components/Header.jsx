import React from 'react';
import { NavLink } from 'react-router-dom';
import logoImg from '../images/88567.jpg';

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
        <img src={logoImg} alt="ND Build & Design" style={{height: '45px', objectFit: 'contain'}} />
      </div>
      <nav className="nav-center">
        <ul className="nav-links">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink to="/faq" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              FAQ
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Contact Us
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="header-action">
        <NavLink to="/admin" className="btn btn-admin">Admin Login</NavLink>
      </div>
    </header>
  );
};

export default Header;
