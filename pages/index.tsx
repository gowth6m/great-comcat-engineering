import axios from "axios";
import { useContext } from "react";
import Layout from "../components/Layout";
import ProductItem, { ProductItemProps } from "../components/ProductItem";
import Product from "../models/Product";
import db from "../utils/db";
import { CartProductDataType, Store } from "../utils/Store";

export default function Home({ products }: any) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  // adding items to cart
  const addToCartHandler = async (product: any) => {
    const existItem = state.cart.cartItems.find(
      (x: CartProductDataType) => x.slug === product.slug
    );
    const qty = existItem ? existItem.qty + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (qty > data.countInStock) {
      window.alert("Sorry. Product is out of stock");
      return;
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, qty } });
  };

  return (
    <Layout title="Home">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {products.map((product: any) => {
          return (
            <ProductItem
              key={product.slug}
              product={product}
              addToCartHandler={addToCartHandler}
            />
          );
        })}
      </div>
    </Layout>
  );
}

// to fetch from database
export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();

  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
