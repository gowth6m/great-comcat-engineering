/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { ProductDataType } from "../utils/data";

type ProductItemProps = {
  product: ProductDataType;
};

export default function ProductItem({ product }: ProductItemProps) {
  return (
    <div className="card">
      <Link href={"/product/" + product.slug}>
        <img
          src={product.image}
          alt={product.slug}
          className="w-full rounded shadow object-cover"
        />
      </Link>

      <div className="flex flex-col items-center justify-center p-5">
        <Link href={"/product/" + product.slug} className="">
          <h2 className="text-lg">{product.name}</h2>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p className="">{product.price}</p>
        <button className="primary-button" type="button">
          Add to cart
        </button>
      </div>
    </div>
  );
}
