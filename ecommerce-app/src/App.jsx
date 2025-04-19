import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ToastContainer } from "react-toastify"; //Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import Toast styles

function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-100">
            <Navbar />
            <AppRoutes />
            <ToastContainer position="top-right" autoClose={2000} /> {/* Add ToastContainer */}
          </div>
        </BrowserRouter>
      </CartProvider>
    </WishlistProvider>
  );
}

export default App;
