import React from "react";
import { createRoot } from "react-dom/client";
import Login from "./components/login";

const container1 = document.getElementById("login");

const root1 = createRoot(container1);

root1.render(<Login  />);