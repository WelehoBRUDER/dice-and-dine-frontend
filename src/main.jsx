import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App.jsx";
import "./style/variables.css";
import "./style/reusable-components.css";
import "./style/header.css";
import "./style/main.css";
import "./style/menu.css";
import "./style/about.css";
import "./style/profile.css";
import "./style/admin.css";
import "./style/forum.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
