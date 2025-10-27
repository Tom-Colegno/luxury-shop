import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Category from "./pages/Category";
import CartPage from "./pages/CartPage";

function App() {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const CART_LIFETIME = 15 * 60 * 1000;

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedTime = localStorage.getItem("cartTimestamp");

    if (savedCart && savedTime) {
      const now = Date.now();
      const diff = now - parseInt(savedTime, 10);
      if (diff < CART_LIFETIME) {
        setCart(JSON.parse(savedCart));
      } else {
        localStorage.removeItem("cart");
        localStorage.removeItem("cartTimestamp");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("cartTimestamp", Date.now().toString());
  }, [cart]);

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

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    localStorage.removeItem("cartTimestamp");
  };

  return (
    <Router>
      <Navbar cartCount={cart.length} onSearch={setSearchTerm} />
      <Routes>
        <Route
          path="/"
          element={<Home addToCart={addToCart} searchTerm={searchTerm} />}
        />
        <Route
          path="/category/:category"
          element={<Category addToCart={addToCart} />}
        />
        <Route
          path="/cart"
          element={<CartPage cart={cart} updateCart={setCart} />}
        />
      </Routes>
    </Router>
  );
}



export default App;
