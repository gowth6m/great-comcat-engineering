import React, { useContext } from "react";
import router from "next/router";
import Layout from "../../components/Layout";
import Link from "next/link";
import Image from "next/image";
import { CartProductDataType, Store } from "../../utils/Store";
import db from "../../utils/db";
import Product from "../../models/Product";
import axios from "axios";
import { customToast } from "../../utils/customToast";

export default function ProductScreen(props: any) {
  const { product } = props;
  const { state, dispatchStore } = useContext(Store);

  if (!product) {
    return <Layout title="Product not found">Product not found</Layout>;
  }

  // adding items to cart
  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find(
      (x: CartProductDataType) => x.slug === product.slug
    );
    const qty = existItem ? existItem.qty + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (qty > data.countInStock) {
      customToast("Sorry. Product is out of stock");
      return;
    }

    dispatchStore({ type: "CART_ADD_ITEM", payload: { ...product, qty } });
    router.push("/cart");
  };

  return (
    <Layout title={product.name}>
      <div className="py-2 mb-4">
        <Link href="/" className="primary-button">back to products</Link>
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
              <h1 className="text-lg font-semibold">{product.name}</h1>
            </li>
            <li>
              <h1 className="text-lg">{product.category}</h1>
            </li>
            <li>
              <h1 className="text-lg">{product.rating}/5</h1>
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
              <div>£{product.price}</div>
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

// to fetch from database
export async function getServerSideProps(context: any) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();

  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
