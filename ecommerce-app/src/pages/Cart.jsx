import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    cartTotal,
    cartCount,
    updateQuantity,
  } = useContext(CartContext);

  return (
   <div></div>
  );
}
