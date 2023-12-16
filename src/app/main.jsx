import React from "react";
import ReactDOM from "react-dom/client";
import { AppRouter } from "./providers/router-provider";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(<AppRouter />);
