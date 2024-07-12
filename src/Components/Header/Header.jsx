import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="header">
      <div>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <p className='logo'>Love&Care</p>
        </Link>
      </div>
      <div className="hamburger" onClick={toggleNav}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav className={`nav ${isNavOpen ? 'active' : ''}`}>
        <ul>
          <li className="nav-item"><Link to="/" onClick={toggleNav}>Home</Link></li>
          <li className="nav-item"><Link to="/about" onClick={toggleNav}>About</Link></li>
          <li className="nav-item"><Link to="/contact" onClick={toggleNav}>Contact Us</Link></li>
          <li className="nav-item"><Link to="/register" onClick={toggleNav}>Register</Link></li>
        </ul>
      </nav>
      {isNavOpen && <div className="overlay" onClick={toggleNav}></div>}
    </header>
  );
};

export default Header;
  