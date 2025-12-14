import { menuData } from '../data/menuData';

const Menu = () => {
  const formatPrice = (price) => {
    return price.toFixed(2).replace('.', ',');
  };

  return (
    <main>
      <section className="menu-section">
        <h1 className="menu-title">Nosso Cardápio</h1>
        <p className="menu-subtitle">
          Sabores autênticos da Itália, feitos com amor e ingredientes frescos
        </p>

        <div className="menu-container">
          <div className="menu-category">
            <h2 className="category-title">Pizzas Tradicionais</h2>
            <div className="menu-grid">
              {menuData.tradicionais.map((pizza) => (
                <div key={pizza.id} className="menu-item">
                  <img
                    src={pizza.image}
                    alt={pizza.name}
                    className="menu-item-image"
                    loading="lazy"
                  />
                  <h3>{pizza.name}</h3>
                  <p>{pizza.description}</p>
                  <span className="price">R$ {formatPrice(pizza.price)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="menu-category">
            <h2 className="category-title">Pizzas Especiais</h2>
            <div className="menu-grid">
              {menuData.especiais.map((pizza) => (
                <div key={pizza.id} className="menu-item">
                  <img
                    src={pizza.image}
                    alt={pizza.name}
                    className="menu-item-image"
                    loading="lazy"
                  />
                  <h3>{pizza.name}</h3>
                  <p>{pizza.description}</p>
                  <span className="price">R$ {formatPrice(pizza.price)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="menu-category">
            <h2 className="category-title">Pizzas Doces</h2>
            <div className="menu-grid">
              {menuData.doces.map((pizza) => (
                <div key={pizza.id} className="menu-item">
                  <img
                    src={pizza.image}
                    alt={pizza.name}
                    className="menu-item-image"
                    loading="lazy"
                  />
                  <h3>{pizza.name}</h3>
                  <p>{pizza.description}</p>
                  <span className="price">R$ {formatPrice(pizza.price)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Menu;

