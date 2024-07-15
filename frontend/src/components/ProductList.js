import React, { useState, useEffect } from "react";
import { getProducts, addToCart } from "../services/api";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products);
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    const quantity = 1; // You can modify this to allow the user to specify quantity
    await addToCart(productId, quantity);
    alert("Product added to cart");
  };

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => handleAddToCart(product.id)}>
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
