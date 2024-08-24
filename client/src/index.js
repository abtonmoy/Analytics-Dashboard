import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./state";
import App from "./App";
import axios from "axios";

// Axios Interceptor to add token to headers
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
