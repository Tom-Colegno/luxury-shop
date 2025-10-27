import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function Category({ addToCart }) {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/category/${category}`)
      .then(res => setProducts(res.data.slice(-5)))
      .catch(err => console.error(err));
  }, [category]);

  return (
    <div>
      <h2>Catégorie : {category}</h2>
      <div className="grid">
        {products.map(p => (
          <ProductCard key={p.id} product={p} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}

export default Category;
