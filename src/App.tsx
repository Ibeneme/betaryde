import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
// You can import additional pages here as you create them, e.g.:
// import Services from "./pages/Services";
// import Pricing from "./pages/Pricing";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add more routes here as your app grows */}
          {/* <Route path="/services" element={<Services />} /> */}
          {/* <Route path="/pricing" element={<Pricing />} /> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
