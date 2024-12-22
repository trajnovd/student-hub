import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../ui/AppLayout";
import Home from "../pages/Home";
import Map from "../pages/Map";
import Events from "../pages/Events";
import Discounts from "../pages/Discounts";
import Scholarships from "../pages/Scholarships";

// Simulate authentication logic
const isAuthenticated = true; // Replace with actual logic later

function AppRouter() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/events" element={<Events />} />
          <Route path="/discounts" element={<Discounts />} />
          <Route path="/scholarships" element={<Scholarships />} />
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
