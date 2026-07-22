import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logoImg from '../images/88567.jpg';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <header className="header">
      <div className="header-logo" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
        <img src={logoImg} alt="ND Build & Design" style={{height: '45px', objectFit: 'contain'}} />
      </div>

      {/* Desktop Navigation (Removed, using Hamburger only now) */}

      <div className="header-actions">
        <button className="mobile-menu-btn" onClick={toggleMobileMenu} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>



      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <ul className="mobile-nav-links">
            <li>
              <NavLink to="/" onClick={closeMobileMenu} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/blog" onClick={closeMobileMenu} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink to="/faq" onClick={closeMobileMenu} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                FAQ
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={closeMobileMenu} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                Contact Us
              </NavLink>
            </li>
            <li style={{marginTop: '1rem'}}>
              {isLoggedIn ? (
                <NavLink to="/admin" onClick={closeMobileMenu}>
                  <button className="btn btn-dark" style={{width: '100%', padding: '0.75rem 1rem'}}>ADMIN DASHBOARD</button>
                </NavLink>
              ) : (
                <NavLink to="/login" onClick={closeMobileMenu}>
                  <button className="btn btn-dark" style={{width: '100%', padding: '0.75rem 1rem'}}>ADMIN LOGIN</button>
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
