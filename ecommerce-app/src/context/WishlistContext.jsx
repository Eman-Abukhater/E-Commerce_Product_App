import React, { createContext, useState, useEffect } from "react";

export const WishlistContext = createContext();
const [message, setMessage] = useState(""); // show message when add the item to wish list

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product) => {
    if (!wishlist.some((item) => item.id === product.id)) {
      setWishlist([...wishlist, product]);
      setMessage(`${product.title} added to wishlist ❤️`);

      // Auto-hide after 2.5s
      setTimeout(() => setMessage(""), 2500);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, message }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
