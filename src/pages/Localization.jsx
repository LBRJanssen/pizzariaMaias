const Localization = () => {
  return (
    <main>
      <section className="localization-section">
        <h1 className="localization-title">Nossa Localização</h1>
        <p className="localization-subtitle">
          Venha nos visitar! Estamos esperando por você.
        </p>

        <div className="localization-container">
          <div className="address-info">
            <div className="address-card">
              <h2>Endereço</h2>
              <p><strong>Rua das Pizzas, 123</strong></p>
              <p>Bairro Centro</p>
              <p>São Paulo - SP</p>
              <p>CEP: 01234-567</p>
            </div>

            <div className="address-card">
              <h2>Como Chegar</h2>
              <p>
                Estamos localizados no coração da cidade, com fácil acesso por transporte público e estacionamento disponível.
              </p>
              <p><strong>Linhas de ônibus:</strong> 123, 456, 789</p>
              <p><strong>Metrô:</strong> Estação Central (500m)</p>
            </div>

            <div className="address-card">
              <h2>Estacionamento</h2>
              <p>Oferecemos estacionamento gratuito para nossos clientes.</p>
              <p>Vagas limitadas - Consulte disponibilidade.</p>
            </div>
          </div>

          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.197576285118!2d-46.633309384407!3d-23.550253884689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr"
              width="100%"
              height="450"
              style={{ border: 0, borderRadius: '10px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização da Pizzaria Maia's"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Localization;