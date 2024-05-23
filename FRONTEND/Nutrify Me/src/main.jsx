import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { LoggedInUserProvider } from "./components/LoggedInUserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoggedInUserProvider>
      <App />
    </LoggedInUserProvider>
  </React.StrictMode>

  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
);
