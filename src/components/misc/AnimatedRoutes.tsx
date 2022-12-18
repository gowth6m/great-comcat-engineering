import { AnimatePresence } from "framer-motion";
import { useLocation, Routes, Route } from "react-router-dom";
import { Home } from "../home/Home";
import { PageNotFound } from "./PageNotFound";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
