import { motion } from "framer-motion";
import router from "next/router";
import React, { useState } from "react";

export default function SearchBar({ hidden }: any) {
  const [show] = React.useState(hidden);
  const [searchQuery, setSearchQuery] = useState("");

  const searchSubmitHandler = (e: any) => {
    e.preventDefault();
    router.push(`/search?query=${searchQuery}`);
  };

  return (
    <motion.div
      variants={variantsProfile}
      animate={!show ? "transform" : "stop"}
      className={
        "origin-top fixed top-12 left-0 bg-[var(--black)] w-[100vw] h-1/6" +
        (show ? " hidden" : "")
      }
    >
      <div className="text-white flex flex-col justify-center align-middle w-3/6 mx-auto text-center">
        <br />
        <form onSubmit={searchSubmitHandler}>
          <input
            type="search"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products"
            className="w-full h-10 rounded-lg text-white text-lg px-2 text-center"
            autoFocus
          />
          <button
            type="submit"
            className="primary-button mt-2 w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </motion.div>
  );
}
const variantsProfile = {
  transform: {
    scaleY: [0, 1.2, 1],
    transition: { duration: 0.5 },
  },
};
