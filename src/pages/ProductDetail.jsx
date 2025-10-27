import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaCartPlus } from "react-icons/fa";

function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <p style={{ textAlign: "center" }}>Chargement...</p>;

  return (
    <div className="product-detail fade-in">
      <div className="detail-container">
        <img src={product.image} alt={product.title} />
        <div className="detail-info">
          <h2>{product.title}</h2>
          <p className="category">{product.category}</p>
          <p className="description">{product.description}</p>
          <p className="price">{product.price} €</p>
          <button onClick={() => addToCart(product)}>
            <FaCartPlus /> Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
