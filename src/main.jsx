import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "../src/components/Navbar.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "./providers/QueryProvider.jsx";
import CartProvider from "./providers/CartProvider.jsx";
import InteractionsProvider from "./providers/InteractionsProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryProvider>
      <Router>
        <AuthProvider>
          <InteractionsProvider>
            <CartProvider>
              <Navbar />
              <App />
              <Toaster richColors position="bottom-right" />
            </CartProvider>
          </InteractionsProvider>
        </AuthProvider>
      </Router>
    </QueryProvider>
  </React.StrictMode>
);
