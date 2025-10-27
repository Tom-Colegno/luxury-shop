import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

function ProductCard({ product, addToCart }) {
  return (
    <div className="card fade-in">
      <Link
        to={`/product/${product.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <img src={product.image} alt={product.title} />
        <h3>{product.title}</h3>
      </Link>
      <p>{product.price} €</p>
      <button className="add-to-cart" onClick={() => addToCart(product)}>
        <ShoppingBag size={18} className="cart-btn-icon" />
        <span>Ajouter au panier</span>
      </button>
    </div>
  );
}

export default ProductCard;
