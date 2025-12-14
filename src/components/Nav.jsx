import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="top__nav" role="navigation" aria-label="Menu principal">
      <div className="top__nav--links top__nav--left">
        <Link to="/" aria-label="Ir para página inicial">
          HOME PAGE
        </Link>
        <Link to="/menu" aria-label="Ver cardápio">
          CARDÁPIO
        </Link>
      </div>

      <img alt="Logo da Pizzaria Maia's" className="logo" src="/image/logo-maias.png" />

      <div className="top__nav--links top__nav--right">
        <Link to="/contact" aria-label="Ir para página de contato">
          CONTACT
        </Link>
        <Link to="/localization" aria-label="Ver localização">
          LOCATE
        </Link>
      </div>
    </nav>
  );
};

export default Nav;

