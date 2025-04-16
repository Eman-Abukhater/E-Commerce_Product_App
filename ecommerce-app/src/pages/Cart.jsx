import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cartItems, removeFromCart, cartTotal, cartCount, updateQuantity } =
    useContext(CartContext);

  return (
    <div className="px-4 py-8 md:px-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-indigo-500 mb-6 text-center md:text-left">
        🛒 Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>Your cart is empty.</p>
          <Link to="/" className="text-indigo-500 underline mt-4 block">
            ← Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white p-4 rounded shadow gap-4"
              >
                {/* Image & Title */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-20 w-20 object-contain"
                  />
                  <div>
                    <h2 className="font-semibold text-sm sm:text-base">
                      {item.title}
                    </h2>
                    <p className="text-sm text-gray-600">${item.price}</p>
                  </div>
                </div>

                {/* Quantity & Remove Buttons */}
                <div className="flex flex-wrap justify-end items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2 py-1 bg-gray-200 rounded text-lg"
                  >
                    −
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-200 rounded text-lg"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:underline ml-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total Price */}
          <div className="mt-8 text-center">
            <p className="text-lg font-semibold">
              Total ({cartCount} items): ${cartTotal}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
