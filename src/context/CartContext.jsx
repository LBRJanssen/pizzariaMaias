import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // carrega do localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('pizzariaCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // salva no localStorage
  useEffect(() => {
    localStorage.setItem('pizzariaCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (pizza) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === pizza.id);
      
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === pizza.id
            ? { ...item, quantity: item.quantity + 1, notes: item.notes || '' }
            : item
        );
      }
      
      return [...prevItems, { ...pizza, quantity: 1, notes: '' }];
    });
  };

  const removeFromCart = (pizzaId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== pizzaId));
  };

  const updateQuantity = (pizzaId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(pizzaId);
      return;
    }
    
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === pizzaId ? { ...item, quantity } : item
      )
    );
  };

  const updateNotes = (pizzaId, notes) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === pizzaId ? { ...item, notes } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('pizzariaCart');
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateNotes,
        clearCart,
        getTotalItems,
        getTotalPrice,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

