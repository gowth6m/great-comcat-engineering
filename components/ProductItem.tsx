/* eslint-disable @next/next/no-img-element */
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import React from "react";
import { ProductDataType } from "../utils/data";
import { IconAddCart, IconHeart, IconLoadingAnimation } from "./CustomIcons";

export type ProductItemProps = {
  product: ProductDataType;
  addToCartHandler: (product: ProductDataType) => void;
  currentAddingItem: string;
};

export default function ProductItem({
  product,
  addToCartHandler,
  currentAddingItem,
}: ProductItemProps) {
  return (
    <motion.div
      className="card overflow-hidden"
      transition={{
        duration: 1,
        delay: 0,
      }}
      viewport={{ once: true }}
      initial="offscreen"
      whileInView="onscreen"
      variants={itemVariants}
    >
      <Link href={"/product/" + product.slug}>
        <img
          src={product.image}
          alt={product.slug}
          className="w-full first-line:rounded-t-xl shadow object-cover h-72 md:h-auto"
        />
      </Link>

      <div className="flex flex-col items-center justify-center text-black">
        <Link
          href={"/product/" + product.slug}
          className="bg-[var(--blue)] w-full p-2"
        >
          <h2 className="text-m text-white text-center">{product.name}</h2>
        </Link>

        <div className="flex flex-row align-middle justify-between w-full bg-[var(--black)] h-10 ">
          <div className="text-white my-auto flex-1 text-center w-full">
            £{product.price.toFixed(2)}
          </div>
          <button className="justify-self-center flex-1  w-full hover:bg-[var(--blue)]">
            <IconHeart fill={"white"} className={"mx-auto"} />
          </button>
          <button
            className=" flex-1 w-full hover:bg-[var(--blue)]"
            type="button"
            onClick={() => {
              addToCartHandler(product);
            }}
          >
            {currentAddingItem === product.slug ? (
              <>
                <IconLoadingAnimation />
              </>
            ) : (
              <IconAddCart fill={"white"} className={"mx-auto"} />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

const itemVariants: Variants = {
  offscreen: {
    scale: 0,
  },
  onscreen: {
    scale: 1,
    transition: {
      type: "spring",
      bounce: 0.5,
      duration: 1,
    },
  },
};
