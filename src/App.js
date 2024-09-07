import React, { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Layout from "./components/Layout";
import ErrorBoundary from "./helpers/ErrorBoundary.js";
import CustomSuspense from "./helpers/CustomSuspense.js";
//lazy loading for the pages that might not be visited at all.
const ProductDetail = lazy(() => import("./pages/ProductDetails"));
const SuccessfulPaymentPage = lazy(() => import("./pages/Successful.js"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.js"));

//dummy comment

const App = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<CustomSuspense component={<ProductDetail />} />} />
            <Route path="/successful-payment" element={<CustomSuspense component={<SuccessfulPaymentPage />} />} />
            <Route path="*" element={<CustomSuspense component={<NotFoundPage />} />} />
          </Routes>
        </Layout>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
