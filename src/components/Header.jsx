const Header = () => {
  return (
    <header className="main__header">
      <p className="top-description">
        Olá, seja bem-vindo ao meu projeto. Você pode acessar o meu GitHub clicando no
        icone ao lado!
      </p>
      <a
        rel="noopener noreferrer"
        href="https://github.com/LBRJanssen"
        target="_blank"
        aria-label="Acessar perfil no GitHub"
      >
        <img
          alt="icone-github"
          className="icon--github-circle"
          src="/image/git--icon.png"
        />
      </a>
    </header>
  );
};

export default Header;

