import React, { useState } from "react";
import { checkoutCart } from "../services/api";

const Checkout = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      const response = await checkoutCart({ name, email, address });
      setMessage("Order placed successfully!");
    } catch (error) {
      setMessage("Error placing order: " + error.message);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <form onSubmit={handleCheckout}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit">Place Order</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Checkout;
