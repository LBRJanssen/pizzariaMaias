import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="top__nav" role="navigation" aria-label="Menu principal">
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
    </nav>
  );
};

export default Nav;

