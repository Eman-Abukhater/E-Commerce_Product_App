// src/components/Navbar.jsx
import React, { createContext, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { cartCount } = useContext(CartContext);

  return (
    <nav className="bg-white shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold text-blue-600">
          ShopEasy
        </Link>

        {/* Menu toggle for mobile */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setShowMenu(!showMenu)}
        >
          ☰
        </button>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-3 text-gray-700 font-medium">
          <li>
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>
            <Link to="/wishlist" className="hover:text-blue-600">
              Wishlist
            </Link>
          </li>
          <li className="relative">
            <Link to="/cart" className="hover:text-blue-600 text-lg py-3">
              🛒 
            </Link>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </li>
        </ul>
      </div>

      {/* Mobile menu */}
      {showMenu && (
        <ul className="md:hidden mt-2 space-y-2 text-gray-700 font-medium">
          <li>
            <Link to="/" onClick={() => setShowMenu(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/wishlist" onClick={() => setShowMenu(false)}>
              Wishlist
            </Link>
          </li>
          <li>
            <Link to="/cart" onClick={() => setShowMenu(false)}>
              Cart
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
