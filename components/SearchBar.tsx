import { motion } from "framer-motion";
import React from "react";

export default function SearchBar({ hidden }: any) {
  const [show] = React.useState(hidden);

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
        <label htmlFor="" className="text-lg">
          Search
        </label>
        <input type="text" autoFocus />
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
