const Footer = () => {
  return (
    <footer className="baseboard--footer">
      <div className="baseboard">
        <a
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/lbjanssen/"
          target="_blank"
          aria-label="LinkedIn"
        >
          <img
            alt="linkedin-janssen"
            src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white"
          />
        </a>
        <a
          rel="noopener noreferrer"
          href="https://github.com/LBRJanssen"
          target="_blank"
          aria-label="GitHub"
        >
          <img
            alt="github-janssen"
            src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"
          />
        </a>
      </div>
      <div className="baseboard">
        <p>Copyright © 2022 - Todos os direitos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;

