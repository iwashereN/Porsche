import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import Welcome from "./components/welcome";
import Info from "./components/info";
// Get the containers from the DOM
const container1 = document.getElementById("username");
const container2 = document.getElementById("welcome");
const container3 = document.getElementById("ok");
// Create roots for each container
const root1 = createRoot(container1);
const root2 = createRoot(container2);
const root3 = createRoot(container3);
// Render components into each container
root1.render(<App  />);
root2.render(<Welcome  />);
root3.render(<Info  />);