import { useCart } from '../context/CartContext';

const FloatingCart = () => {
  const { setIsCartOpen, getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <button
      className="floating-cart-btn"
      onClick={() => setIsCartOpen(true)}
      aria-label="Abrir carrinho"
    >
      🛒
      {totalItems > 0 && (
        <span className="floating-cart-badge">{totalItems}</span>
      )}
    </button>
  );
};

export default FloatingCart;

