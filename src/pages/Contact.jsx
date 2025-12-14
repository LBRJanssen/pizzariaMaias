import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // checa se ta tudo preenchido
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    // valida email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }
    
    setIsSubmitting(true);
    
    // faz o envio fake
    setTimeout(() => {
      alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <main>
      <section className="contact-section">
        <h1 className="contact-title">Entre em Contato</h1>
        <p className="contact-subtitle">
          Estamos prontos para atender você! Faça seu pedido ou tire suas dúvidas.
        </p>

        <div className="contact-container">
          <div className="contact-info">
            <div className="info-card">
              <h3>Telefone</h3>
              <p>(11) 9999-9999</p>
              <p>(11) 8888-8888</p>
            </div>
            <div className="info-card">
              <h3>E-mail</h3>
              <p>contato@pizzariamaias.com.br</p>
              <p>pedidos@pizzariamaias.com.br</p>
            </div>
            <div className="info-card">
              <h3>Horário de Funcionamento</h3>
              <p>Segunda a Quinta: 18h - 23h</p>
              <p>Sexta e Sábado: 18h - 00h</p>
              <p>Domingo: 18h - 22h</p>
            </div>
            <div className="info-card">
              <h3>Redes Sociais</h3>
              <div className="social-links">
                <a href="https://instagram.com/lbrjanssen" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
                <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Envie sua Mensagem</h2>
            <div className="form-group">
              <label htmlFor="name">Nome Completo</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Telefone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Assunto</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="">Selecione um assunto</option>
                <option value="pedido">Fazer Pedido</option>
                <option value="duvida">Dúvida</option>
                <option value="reclamacao">Reclamação</option>
                <option value="sugestao">Sugestão</option>
                <option value="outro">Outro</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="message">Mensagem</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Contact;