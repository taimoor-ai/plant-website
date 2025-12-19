import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./context/Cartcontext.jsx";
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <CartProvider>
    <div className="font-nunito">
      <App />
    </div>
  </CartProvider>

  // </StrictMode>,
);
