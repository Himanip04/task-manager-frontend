import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import ThemeContextProvider from "../context/ThemeContext.jsx";



ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeContextProvider>
);
