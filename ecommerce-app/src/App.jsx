import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DarkModeProvider } from "./context/DarkModeContext"; // ✅

function App() {
  return (
    <DarkModeProvider> 
      <WishlistProvider>
        <CartProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
              <Navbar />
              <AppRoutes />
              <ToastContainer position="top-right" autoClose={2000} />
            </div>
          </BrowserRouter>
        </CartProvider>
      </WishlistProvider>
    </DarkModeProvider>
  );
}

export default App;
