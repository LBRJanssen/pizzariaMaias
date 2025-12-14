import { Link } from 'react-router-dom';
import { highlights } from '../data/menuData';

const Home = () => {
  return (
    <main>
      <section id="home" className="hero-section">
        <div className="border--div">
          <div className="div--items">
            <img
              alt="item--primary"
              className="online-in-house"
              src={`${import.meta.env.BASE_URL}image/peperonni--pizza.png`}
            />
          </div>
          <div className="div--the-best-pizza">
            <p className="paragraph--best-pizza">
              Aqui na Pizzaria Maia's, valorizamos a arte italiana da pizza!!
            </p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="about-container">
          <h2 className="section-title">Sobre Nós</h2>
          <p className="about-text">
            A Pizzaria Maia's nasceu da paixão pela autêntica culinária italiana.
            Utilizamos apenas ingredientes frescos e selecionados, seguindo receitas tradicionais
            que passam de geração em geração. Cada pizza é preparada com cuidado e dedicação,
            garantindo um sabor único e inesquecível.
          </p>
        </div>
      </section>

      <section className="highlights-section">
        <h2 className="section-title">Destaques do Cardápio</h2>
        <div className="highlights-grid">
          {highlights.map((pizza) => (
            <div key={pizza.id} className="highlight-card">
              <img
                src={pizza.image}
                alt={pizza.name}
                className="menu-item-image"
                loading="lazy"
              />
              <h3>{pizza.name}</h3>
              <p>{pizza.description}</p>
              <span className="highlight-price">R$ {pizza.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="menu-link-container">
          <Link to="/menu" className="menu-link-btn">
            <span>Ver Cardápio Completo</span>
          </Link>
        </div>
      </section>

      <section className="features-section">
        <div className="features-container">
          <div className="feature-item">
            <h3>Forno a Lenha</h3>
            <p>Nossas pizzas são assadas em forno a lenha tradicional, garantindo sabor autêntico</p>
          </div>
          <div className="feature-item">
            <h3>Ingredientes Frescos</h3>
            <p>Selecionamos diariamente os melhores ingredientes para garantir qualidade</p>
          </div>
          <div className="feature-item">
            <h3>Entrega Rápida</h3>
            <p>Entregamos em até 30 minutos na sua região</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;

