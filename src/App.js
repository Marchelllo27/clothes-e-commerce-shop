import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetails";
import SuccessfulPaymentPage from "./pages/Successful";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from "./components/Layout";
import ErrorBoundary from "./components/ErrorBoundary";

//dummy comment

const App = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/successful-payment" element={<SuccessfulPaymentPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
