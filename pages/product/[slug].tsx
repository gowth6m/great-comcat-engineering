import React, { useContext } from "react";
import router, { useRouter } from "next/router";
import Layout from "../../components/Layout";
import data, { ProductDataType } from "../../utils/data";
import Link from "next/link";
import Image from "next/image";
import { CartProductDataType, Store } from "../../utils/Store";

export default function ProductScreen() {
  const { state, dispatch } = useContext(Store);
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((x: ProductDataType) => x.slug === slug);
  if (!product) {
    return <div>Product not found</div>;
  }

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find(
      (x: CartProductDataType) => x.slug === product.slug
    );
    const qty = existItem ? existItem.qty + 1 : 1;

    if (qty > product.countInStock) {
      window.alert("Sorry. Product is out of stock");
      return;
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, qty } });
    router.push("/cart");
  };

  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/">back to products</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        {/* Image */}
        <div className="md:col-span-2 rounded-lg">
          <Image
            className="rounded-lg"
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </div>
        {/* List on the right of image */}
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>
              <h1 className="text-lg">{product.category}</h1>
            </li>
            <li>
              <h1 className="text-lg">{product.rating}</h1>
            </li>
            <li>
              <h1 className="text-lg">{product.description}</h1>
            </li>
          </ul>
        </div>
        {/* Below the right text */}
        <div className="">
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>{product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.countInStock > 0 ? "In stock" : "Unavailable"}</div>
            </div>
            <button
              className="primary-button w-full"
              onClick={addToCartHandler}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
