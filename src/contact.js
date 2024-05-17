import React from "react";
import { createRoot } from "react-dom/client";
import Header from "./components/header";
import Footer from "./components/footer";
import Contact from "./components/cont";

// Get the containers from the DOM
const container1 = document.getElementById("footer");
const container2 = document.getElementById("header");
const container3 = document.getElementById("contact");
// Create roots for each container
const root1 = createRoot(container1);
const root2 = createRoot(container2);
const root3 = createRoot(container3);
// Render components into each container
root1.render(<Footer  />);
root2.render(<Header  />);
root3.render(<Contact  />);