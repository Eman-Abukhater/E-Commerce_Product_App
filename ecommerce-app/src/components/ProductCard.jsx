import React, { useContext } from "react";
import { CartContext } from "../context/CartContext"; // import context

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext); // use context
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition duration-400">
      <img
        src={product.image}
        alt={product.title}
        className="h-48 object-contain w-full mb-4"
      />
      <h2 className="text-md w-1/2 font-semibold line-clamp-2 mb-2">
        {product.title}
      </h2>
      <p className="text-indigo-500 font-bold text-lg">${product.price}</p>
      <p className="text-sm text-gray-500 mb-2 capitalize">
        {product.category}
      </p>
      <div className="flex items-center gap-1 text-yellow-500 text-sm">
        ⭐ {product.rating.rate} ({product.rating.count})
      </div>
      <button
        className="mt-4 w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition"
        onClick={() => addToCart(product)} // call addToCart
      >
        Add to Cart
      </button>
    </div>
  );
}
