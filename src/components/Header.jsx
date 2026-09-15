import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logoImg from '../images/88567.png';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShow(false); // scrolling down
      } else {
        setShow(true);  // scrolling up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <header
      className="header"
      style={{
        transform: show ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s ease-in-out'
      }}
    >
      <div className="header-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img src={logoImg} alt="NTD Build & Design Solutions" style={{ height: '70px', objectFit: 'contain', transform: 'scale(1.6)' }} />
      </div>

      {/* Desktop Navigation */}
      <nav className="header-desktop-nav" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <ul className="nav-links" style={{ margin: 0, padding: 0 }}>
          <li><NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>About Us</NavLink></li>
          <li><NavLink to="/blog" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Blog</NavLink></li>
          <li><NavLink to="/faq" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>FAQ</NavLink></li>
        </ul>
      </nav>

      <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div className="header-desktop-nav" style={{ display: 'flex', gap: '1rem' }}>
          <NavLink to="/contact">
            <button className="btn btn-primary" style={{ fontWeight: '600', padding: '0.6rem 1.5rem', borderRadius: '30px' }}>
              CONTACT US
            </button>
          </NavLink>
          {isLoggedIn ? (
            <NavLink to="/admin"><button className="btn btn-dark" style={{ padding: '0.6rem 1.5rem', borderRadius: '30px' }}>ADMIN</button></NavLink>
          ) : (
            <NavLink to="/login"><button className="btn btn-dark" style={{ padding: '0.6rem 1.5rem', borderRadius: '30px' }}>LOGIN</button></NavLink>
          )}
        </div>

        <button className="mobile-menu-btn" onClick={toggleMobileMenu} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', color: '#FFFFFF' }}>
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
              <NavLink to="/about" onClick={closeMobileMenu} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                About Us
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
            <li style={{ marginTop: '1rem' }}>
              {isLoggedIn ? (
                <NavLink to="/admin" onClick={closeMobileMenu}>
                  <button className="btn btn-dark" style={{ width: '100%', padding: '0.75rem 1rem' }}>ADMIN DASHBOARD</button>
                </NavLink>
              ) : (
                <NavLink to="/login" onClick={closeMobileMenu}>
                  <button className="btn btn-dark" style={{ width: '100%', padding: '0.75rem 1rem' }}>ADMIN LOGIN</button>
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
