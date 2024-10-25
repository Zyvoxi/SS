import React from "react";
import ReactDOM from "react-dom/client";
import "./Components/Styles/index.css";
import App from "./App.jsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import reportWebVitals from "./reportWebVitals.js";
import winston from "winston";

const logger = winston.createLogger({
  // eslint-disable-next-line no-undef
  level: process.env.NODE_ENV === "production" ? "warn" : "debug",
  transports: [new winston.transports.Console()],
});

logger.debug("Development Build");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// eslint-disable-next-line no-console
reportWebVitals(console.debug);
