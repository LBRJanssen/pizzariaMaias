import { useState } from 'react';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const {
    cartItems,
    getTotalPrice,
    clearCart,
    isCheckoutOpen,
    setIsCheckoutOpen,
  } = useCart();

  const [deliveryType, setDeliveryType] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [address, setAddress] = useState({
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    zipCode: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  const formatPrice = (price) => {
    return price.toFixed(2).replace('.', ',');
  };

  const generatePixCode = () => {
    return '00020126360014BR.GOV.BCB.PIX0114+5511999999999020400005303986540' + 
           getTotalPrice().toFixed(2) + '5802BR5925PIZZARIA MAIAS LTDA6009SAO PAULO62070503***6304';
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'number') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
      if (formattedValue.length > 19) formattedValue = formattedValue.slice(0, 19);
    } else if (name === 'expiry') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(?=\d)/g, '$1/');
      if (formattedValue.length > 5) formattedValue = formattedValue.slice(0, 5);
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    setCardData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const showAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(null), 3000);
  };

  const validateCard = () => {
    if (!cardData.number || cardData.number.replace(/\s/g, '').length < 16) {
      showAlert('Numero do cartao invalido');
      return false;
    }
    if (!cardData.name || cardData.name.length < 3) {
      showAlert('Nome no cartao invalido');
      return false;
    }
    if (!cardData.expiry || cardData.expiry.length < 5) {
      showAlert('Data de validade invalida');
      return false;
    }
    if (!cardData.cvv || cardData.cvv.length < 3) {
      showAlert('CVV invalido');
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (paymentMethod === 'card' && !validateCard()) {
      return;
    }

    setIsProcessing(true);

    // simula processamento
    setTimeout(() => {
      const newOrderNumber = Math.floor(Math.random() * 1000000);
      setOrderNumber(newOrderNumber);
      setOrderConfirmed(true);
      setIsProcessing(false);
      clearCart();
    }, 2000);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    if (name === 'zipCode') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2');
      if (formattedValue.length > 9) formattedValue = formattedValue.slice(0, 9);
    }
    
    setAddress((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handleDeliveryTypeSelect = (type) => {
    setDeliveryType(type);
    setShowPayment(false);
    // limpa endereco se mudar para retirada
    if (type === 'retirada') {
      setAddress({ street: '', number: '', complement: '', neighborhood: '', city: '', zipCode: '' });
    }
  };

  const handleContinueToPayment = () => {
    if (deliveryType === 'delivery') {
      if (!address.street || !address.number || !address.neighborhood || !address.city || !address.zipCode) {
        showAlert('Por favor, preencha todos os campos obrigatorios do endereco');
        return;
      }
    }
    setShowPayment(true);
  };

  const handleClose = () => {
    if (orderConfirmed) {
      setIsCheckoutOpen(false);
      setOrderConfirmed(false);
      setOrderNumber(null);
      setDeliveryType(null);
      setShowPayment(false);
      setAddress({ street: '', number: '', complement: '', neighborhood: '', city: '', zipCode: '' });
      setCardData({ number: '', name: '', expiry: '', cvv: '' });
    } else {
      setIsCheckoutOpen(false);
    }
  };

  if (!isCheckoutOpen) return null;

  return (
    <>
      {alertMessage && (
        <div className="custom-alert-overlay" onClick={() => setAlertMessage(null)}>
          <div className="custom-alert" onClick={(e) => e.stopPropagation()}>
            <div className="alert-icon">⚠️</div>
            <p className="alert-message">{alertMessage}</p>
            <button className="alert-close-btn" onClick={() => setAlertMessage(null)}>
              OK
            </button>
          </div>
        </div>
      )}
      <div className="checkout-overlay" onClick={handleClose}>
        <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
        <div className="checkout-header">
          <h2>Finalizar Pedido</h2>
          <button className="close-btn" onClick={handleClose}>
            ×
          </button>
        </div>

        {orderConfirmed ? (
          <div className="order-confirmed">
            <div className="success-icon">✓</div>
            <h2>Pedido Confirmado!</h2>
            <p className="order-number">Número do pedido: #{orderNumber}</p>
            <p>Seu pedido está sendo preparado e será entregue em breve!</p>
            <button onClick={handleClose} className="btn-primary">
              Fechar
            </button>
          </div>
        ) : (
          <div className="checkout-content">
            <div className="checkout-summary">
              <h3>Resumo do Pedido</h3>
              <div className="summary-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="summary-item">
                    <div className="summary-item-main">
                      <span>{item.name} x{item.quantity}</span>
                      <span>R$ {formatPrice(item.price * item.quantity)}</span>
                    </div>
                    {item.notes && (
                      <div className="summary-item-notes">
                        <span className="notes-label">Obs:</span>
                        <span className="notes-text">{item.notes}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="summary-total">
                <span>Total:</span>
                <span>R$ {formatPrice(getTotalPrice())}</span>
              </div>
            </div>

            <div className="delivery-section">
              <h3>Tipo de Entrega</h3>
              <div className="delivery-options">
                <button
                  className={`delivery-option ${deliveryType === 'delivery' ? 'selected' : ''}`}
                  onClick={() => handleDeliveryTypeSelect('delivery')}
                >
                  <span className="delivery-icon">🚚</span>
                  <span className="delivery-title">Delivery</span>
                  <span className="delivery-subtitle">Entrega em domicilio</span>
                </button>
                <button
                  className={`delivery-option ${deliveryType === 'retirada' ? 'selected' : ''}`}
                  onClick={() => handleDeliveryTypeSelect('retirada')}
                >
                  <span className="delivery-icon">🏪</span>
                  <span className="delivery-title">Retirada</span>
                  <span className="delivery-subtitle">Retirar na loja</span>
                </button>
              </div>
            </div>

            {!showPayment && deliveryType === 'delivery' && (
              <div className="address-section">
                <h3>Endereco de Entrega</h3>
                <div className="address-form">
                  <div className="form-group">
                    <label>Rua/Avenida *</label>
                    <input
                      type="text"
                      name="street"
                      value={address.street}
                      onChange={handleAddressChange}
                      placeholder="Nome da rua"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Numero *</label>
                      <input
                        type="text"
                        name="number"
                        value={address.number}
                        onChange={handleAddressChange}
                        placeholder="123"
                      />
                    </div>
                    <div className="form-group">
                      <label>Complemento</label>
                      <input
                        type="text"
                        name="complement"
                        value={address.complement}
                        onChange={handleAddressChange}
                        placeholder="Apto, bloco, etc"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Bairro *</label>
                    <input
                      type="text"
                      name="neighborhood"
                      value={address.neighborhood}
                      onChange={handleAddressChange}
                      placeholder="Nome do bairro"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Cidade *</label>
                      <input
                        type="text"
                        name="city"
                        value={address.city}
                        onChange={handleAddressChange}
                        placeholder="Sao Paulo"
                      />
                    </div>
                    <div className="form-group">
                      <label>CEP *</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={address.zipCode}
                        onChange={handleAddressChange}
                        placeholder="00000-000"
                        maxLength="9"
                      />
                    </div>
                  </div>
                  <button onClick={handleContinueToPayment} className="continue-btn">
                    Continuar para Pagamento
                  </button>
                </div>
              </div>
            )}

            {!showPayment && deliveryType === 'retirada' && (
              <div className="pickup-section">
                <h3>Retirada na Loja</h3>
                <p className="pickup-info">
                  Voce podera retirar seu pedido em nossa loja. O tempo medio de preparo e de 30 minutos.
                </p>
                <button onClick={handleContinueToPayment} className="continue-btn">
                  Continuar para Pagamento
                </button>
              </div>
            )}

            {showPayment && (
              <div className="payment-section">
              <h3>Método de Pagamento</h3>
              <div className="payment-methods">
                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="pix"
                    checked={paymentMethod === 'pix'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>PIX</span>
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>Cartão de Crédito</span>
                </label>
              </div>

              {paymentMethod === 'pix' && (
                <div className="pix-payment">
                  <div className="pix-qr-code">
                    <div className="qr-placeholder">
                      <div className="qr-code">QR CODE</div>
                      <p>Escaneie o código para pagar</p>
                    </div>
                  </div>
                  <div className="pix-code">
                    <p>Código PIX:</p>
                    <div className="pix-code-value">{generatePixCode()}</div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(generatePixCode());
                        showAlert('Codigo copiado!');
                      }}
                      className="copy-btn"
                    >
                      Copiar Código
                    </button>
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="card-payment">
                  <div className="form-group">
                    <label>Número do Cartão</label>
                    <input
                      type="text"
                      name="number"
                      value={cardData.number}
                      onChange={handleCardChange}
                      placeholder="0000 0000 0000 0000"
                      maxLength="19"
                    />
                  </div>
                  <div className="form-group">
                    <label>Nome no Cartão</label>
                    <input
                      type="text"
                      name="name"
                      value={cardData.name}
                      onChange={handleCardChange}
                      placeholder="NOME COMPLETO"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Validade</label>
                      <input
                        type="text"
                        name="expiry"
                        value={cardData.expiry}
                        onChange={handleCardChange}
                        placeholder="MM/AA"
                        maxLength="5"
                      />
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={cardData.cvv}
                        onChange={handleCardChange}
                        placeholder="123"
                        maxLength="3"
                      />
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="pay-btn"
              >
                {isProcessing ? 'Processando...' : 'Confirmar Pagamento'}
              </button>
            </div>
            )}
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Checkout;

