import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom"; // ⬅️ Add this line
import { WishlistContext } from "../context/WishlistContext";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

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

      {/* View Details Button */}
      <Link
        to={`/product/${product.id}`}
        className="mt-3 block text-center w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition"
      >
        View Details
      </Link>

      <button
        className="mt-2 w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
      <button
        className="mt-2 w-full bg-pink-500 text-white py-1 rounded hover:bg-pink-600"
        onClick={() => addToWishlist(product)}
      >
        ❤️ Add to Wishlist
      </button>
    </div>
  );
}
