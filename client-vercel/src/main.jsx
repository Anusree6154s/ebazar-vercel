import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { store } from "./app/store.js";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { StrictMode } from "react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
