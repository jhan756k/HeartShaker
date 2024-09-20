import React from 'react';
import './NavBar.css';

const NavBar: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navbarHeight = 70; // Use a fixed height for all screen sizes
      const offset = 20;
      const sectionPosition = section.offsetTop - navbarHeight - offset;

      window.scrollTo({
        top: sectionPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          <span className="logo-heart">Heart</span>
          <span className="logo-shaker">Shaker</span>
        </a>
        <div className="navbar-links">
          <a href="#what-is-heartshaker" className="navbar-link" onClick={(e) => { e.preventDefault(); scrollToSection('what-is-heartshaker'); }}>About</a>
          <a href="#how-it-works" className="navbar-link" onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }}>How It Works</a>
          <button className="navbar-button" onClick={() => scrollToSection('upload-ecg')}>Get Started</button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
