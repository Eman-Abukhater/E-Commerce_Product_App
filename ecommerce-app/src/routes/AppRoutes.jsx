import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Wishlist from "../pages/Wishlist";
import Cart from "../pages/Cart";
import NotFound from "../pages/NotFound";
import ProductDetails from "../pages/ProductDetails";
import ThankYou from "../pages/ThankYou";
import Cancel from "../pages/Cancel";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      
      {/* Stripe Checkout Pages */}
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/cancel" element={<Cancel />} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
