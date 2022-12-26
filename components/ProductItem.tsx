/* eslint-disable @next/next/no-img-element */
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import React from "react";
import { ProductDataType } from "../utils/data";

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
      className="card"
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
          className="w-full rounded-xl shadow object-cover"
        />
      </Link>

      <div className="flex flex-col items-center justify-center p-5 text-black">
        <Link href={"/product/" + product.slug} className="">
          <h2 className="text-lg text-black">{product.name}</h2>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p className="">£{product.price}</p>
        <button
          className="primary-button"
          type="button"
          onClick={() => {
            addToCartHandler(product);
          }}
        >
          {currentAddingItem === product.slug ? (
            <>
              <svg
                role="status"
                className="inline mr-3 w-5 h-5 mb-1 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#414141"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Adding
            </>
          ) : (
            "Add to cart"
          )}
        </button>
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
