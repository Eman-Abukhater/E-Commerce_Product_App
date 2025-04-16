import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        {/* You’ll add Navbar here later */}
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
