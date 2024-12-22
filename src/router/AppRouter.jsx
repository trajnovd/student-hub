import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../ui/AppLayout";
import Home from "../pages/Home";
import Events from "../pages/Events";
import Discounts from "../pages/Discounts";
import Scholarships from "../pages/Scholarships";
import Newsletter from "../pages/Newsletter";

function AppRouter() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/discounts" element={<Discounts />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/newsletter" element={<Newsletter />} />
          {/* <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <LoginForm />
            }
          /> */}
          {/* Catch-all for 404 */}
          <Route path="*" element={<div>404 - Not Found</div>} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default AppRouter;
