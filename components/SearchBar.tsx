import { motion } from "framer-motion";
import router from "next/router";
import React, { useState } from "react";
import { IconMenu, IconSearch } from "./CustomIcons";

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
        "origin-right bg-[var(--black)] w-full" + (show ? " hidden" : "")
      }
    >
      <form
        onSubmit={searchSubmitHandler}
        className="w-full text-white flex flex-row justify-center align-middle first-line:text-center"
      >
        <button type="submit" className="w-auto mx-2 cursor-pointer">
          <IconSearch fill="white" />
        </button>
        <input
          type="search"
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for products"
          className="w-full rounded-lg text-white px-2 text-center"
          autoFocus
        />
      </form>
    </motion.div>
  );
}
const variantsProfile = {
  transform: {
    scaleX: [0, 1.05, 1],
    transition: { duration: 0.5 },
  },
};
