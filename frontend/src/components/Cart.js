import React, { useState, useEffect } from "react";
import { getCartItems, removeFromCart } from "../services/api";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const items = await getCartItems();
      setCartItems(items);
    };
    fetchCartItems();
  }, []);

  const handleRemoveFromCart = async (productId) => {
    await removeFromCart(productId);
    setCartItems(cartItems.filter((item) => item.productId !== productId));
  };

  return (
    <div>
      <h1>Your Cart</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={item.productId}>
            {item.product.name} - ${item.product.price} x {item.quantity}
            <button onClick={() => handleRemoveFromCart(item.productId)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
