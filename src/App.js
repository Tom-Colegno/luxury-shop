import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Category from "./pages/Category";
import CartPage from "./pages/CartPage";
import ProductDetail from "./pages/ProductDetail";

function App() {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const addToCart = (product) => {
    const existing = cart.find((p) => p.id === product.id);
    if (existing) {
      setCart(
        cart.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <Router>
      <Navbar cartCount={cart.reduce((sum, p) => sum + p.quantity, 0)} onSearch={setSearchTerm} />
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} searchTerm={searchTerm} />} />
        <Route path="/category/:category" element={<Category addToCart={addToCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} updateCart={setCart} />} />
        <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
      </Routes>
    </Router>
  );
}

export default App;
