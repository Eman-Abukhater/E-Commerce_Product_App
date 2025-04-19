import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext"; // import context
import { WishlistProvider } from "./context/WishlistContext";

function App() {
  return (
    // Wrap the entire app with CartProvider

    <WishlistProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-100">
            <Navbar />
            <AppRoutes />
          </div>
        </BrowserRouter>
      </CartProvider>
    </WishlistProvider>
  );
}

export default App;
