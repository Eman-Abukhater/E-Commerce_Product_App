import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-pink-500 mb-4">Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {wishlist.map((item) => (
            <div key={item.id} className="p-4 border rounded shadow">
              <img src={item.image} alt={item.title} className="h-32 mx-auto" />
              <h2 className="font-semibold text-sm mt-2">{item.title}</h2>
              <p className="text-indigo-500 font-bold">${item.price}</p>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="mt-2 text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      <Link to="/" className="text-indigo-500 mt-4 block">← Back to Products</Link>
    </div>
  );
}
