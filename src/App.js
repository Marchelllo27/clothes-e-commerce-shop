import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetails";
import SuccessfulPaymentPage from "./pages/Successful";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/successful-payment" element={<SuccessfulPaymentPage />} />
      </Routes>
      <Sidebar />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
