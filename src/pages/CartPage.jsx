import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

function CartPage({ cart, updateCart }) {
  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) {
      updateCart(cart.filter((p) => p.id !== id));
    } else {
      updateCart(
        cart.map((p) =>
          p.id === id ? { ...p, quantity: Number(quantity) } : p
        )
      );
    }
  };

  const handleRemove = (id) => {
    updateCart(cart.filter((p) => p.id !== id));
  };

  const total = cart
    .reduce((sum, p) => sum + p.price * p.quantity, 0)
    .toFixed(2);

  if (cart.length === 0) {
    return (
      <div className="cart-empty fade-in">
        <ShoppingCart size={80} strokeWidth={1.5} className="empty-cart-icon" />
        <h2>Votre panier est vide</h2>
        <p>Découvrez nos produits et trouvez ce qui vous plaît ✨</p>
        <Link to="/" className="return-btn">
          Continuer mes achats
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page fade-in">
      <h2>Votre panier</h2>

      <div className="cart-table">
        <div className="cart-header">
          <span>Produit</span>
          <span>Catégorie</span>
          <span>Prix</span>
          <span>Quantité</span>
          <span>Sous-total</span>
          <span>Action</span>
        </div>

        {cart.map((product) => (
          <div className="cart-item" key={product.id}>
            <div className="cart-product">
              <img src={product.image} alt={product.title} />
              <p>{product.title}</p>
            </div>
            <p className="cart-category">{product.category}</p>
            <p>{product.price.toFixed(2)} €</p>
            <input
              type="number"
              value={product.quantity}
              min="1"
              onChange={(e) => handleQuantityChange(product.id, e.target.value)}
            />
            <p className="subtotal">
              {(product.price * product.quantity).toFixed(2)} €
            </p>
            <button
              className="remove-btn"
              onClick={() => handleRemove(product.id)}
              title="Supprimer l'article"
            >
              ✖
            </button>
          </div>
        ))}
      </div>

      <div className="cart-total">
        <h3>Total : {total} €</h3>
        <Link to="#" className="checkout-btn">
          Procéder au paiement
        </Link>
      </div>
    </div>
  );
}

export default CartPage;
