import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./Home/Home";
import Profile from "./Profile/Profile";
import ContestPage from "./Contests/ContestPage";
import NotFound from "./NotFound";
import FAQ from "./FAQ/FAQ";
import ContactUs from "./ContactUs/ContactUs";
import ActiveContests from "./Contests/ActiveContests";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route path="*" element={<NotFound />}/>
        <Route index element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="contests" element={<ActiveContests />} />
        <Route path="contests/:id" element={<ContestPage/>} />
        <Route path="faq" element={<FAQ />}/>
        <Route path="/contact" element={<ContactUs />}/>
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;