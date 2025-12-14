import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import FloatingCart from './components/FloatingCart';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Contact from './pages/Contact';
import Localization from './pages/Localization';

function App() {
  return (
    <CartProvider>
      <Router basename="/pizzariaMaias">
        <div className="App">
          <Header />
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/localization" element={<Localization />} />
          </Routes>
          <Footer />
          <FloatingCart />
          <Cart />
          <Checkout />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
