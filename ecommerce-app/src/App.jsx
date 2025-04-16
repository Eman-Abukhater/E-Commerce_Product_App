import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext"; // import context

function App() {
  return (
    // Wrap the entire app with CartProvider
    <CartProvider>

    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">

        <Navbar />

        <AppRoutes />
      </div>
    </BrowserRouter>
    </CartProvider>
  );
}

export default App;
