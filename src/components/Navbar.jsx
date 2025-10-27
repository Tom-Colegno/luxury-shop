import { Link } from "react-router-dom";
import { ShoppingCart, Search } from "lucide-react";

function Navbar({ cartCount, onSearch }) {
  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/">
          <img
            src="/luxury-shop.svg"
            alt="LuxuryShop Logo"
            className="logo-img"
          />
        </Link>
      </div>

      <nav className="nav-links">
        <Link to="/">Accueil</Link>
        <Link to="/category/men's clothing">Hommes</Link>
        <Link to="/category/women's clothing">Femmes</Link>
        <Link to="/category/electronics">Électronique</Link>
        <Link to="/category/jewelery">Bijoux</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <div className="nav-right">
        <div className="search-bar">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Rechercher..."
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <Link to="/cart" className="cart-icon">
          <ShoppingCart size={25} />
          <span>{cartCount}</span>
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
