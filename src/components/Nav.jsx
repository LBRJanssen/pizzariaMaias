import { useState } from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {isMenuOpen && (
        <div className="menu-overlay" onClick={closeMenu}></div>
      )}
      <nav className="top__nav" role="navigation" aria-label="Menu principal">
        <button 
          className="menu-toggle" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className={isMenuOpen ? 'hamburger open' : 'hamburger'}></span>
          <span className={isMenuOpen ? 'hamburger open' : 'hamburger'}></span>
          <span className={isMenuOpen ? 'hamburger open' : 'hamburger'}></span>
        </button>

        <div className="top__nav--links top__nav--left">
          <Link to="/" aria-label="Ir para página inicial">
            INÍCIO
          </Link>
          <Link to="/menu" aria-label="Ver cardápio">
            CARDÁPIO
          </Link>
        </div>

        <img alt="Logo da Pizzaria Maia's" className="logo" src={`${import.meta.env.BASE_URL}image/logo-maias.png`} />

        <div className="top__nav--links top__nav--right">
          <Link to="/contact" aria-label="Ir para página de contato">
            CONTATO
          </Link>
          <Link to="/localization" aria-label="Ver localização">
            LOCALIZAÇÃO
          </Link>
        </div>

        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={closeMenu} aria-label="Ir para página inicial">
            INÍCIO
          </Link>
          <Link to="/menu" onClick={closeMenu} aria-label="Ver cardápio">
            CARDÁPIO
          </Link>
          <Link to="/contact" onClick={closeMenu} aria-label="Ir para página de contato">
            CONTATO
          </Link>
          <Link to="/localization" onClick={closeMenu} aria-label="Ver localização">
            LOCALIZAÇÃO
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Nav;

