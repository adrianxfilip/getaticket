import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home/Home";
import Profile from "./Profile/Profile";
import ContestPage from "./Contests/ContestPage";
import { AnimatePresence } from "framer-motion";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route index element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="contests" />
        <Route path="contests/:id" element={<ContestPage/>} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;