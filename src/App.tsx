import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./components/home/Home";
import { PageNotFound } from "./components/misc/PageNotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
       
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
