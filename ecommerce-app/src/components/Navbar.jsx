// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

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
          <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
          <li><Link to="/wishlist" className="hover:text-blue-600">Wishlist</Link></li>
          <li><Link to="/cart" className="hover:text-blue-600">Cart</Link></li>
        </ul>
      </div>

      {/* Mobile menu */}
      {showMenu && (
        <ul className="md:hidden mt-2 space-y-2 text-gray-700 font-medium">
          <li><Link to="/" onClick={() => setShowMenu(false)}>Home</Link></li>
          <li><Link to="/wishlist" onClick={() => setShowMenu(false)}>Wishlist</Link></li>
          <li><Link to="/cart" onClick={() => setShowMenu(false)}>Cart</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
