import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import Layout from "../components/Layout";
import ProductItem, { ProductItemProps } from "../components/ProductItem";
import Product from "../models/Product";
import db from "../utils/db";
import { getError } from "../utils/error";
import { CartProductDataType, Store } from "../utils/Store";

export default function Home({ products }: any) {
  const { state, dispatchStore } = useContext(Store);
  const { cart } = state;
  const [{ loading, error, prod }, dispatch] = useReducer(reducer, {
    loading: true,
    prod: [],
    error: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const { data } = await axios.get(`/api/products/all`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    fetchProducts();
  }, []);

  // adding items to cart
  const addToCartHandler = async (product: any) => {
    const existItem = cart.cartItems.find(
      (x: CartProductDataType) => x.slug === product.slug
    );
    const qty = existItem ? existItem.qty + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (qty > data.countInStock) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    dispatchStore({ type: "CART_ADD_ITEM", payload: { ...product, qty } });
  };

  return (
    <Layout title="Home">
      {loading ? (
        <div className="w-full h-full flex justify-center align-middle text-center">
          <div className="w-full h-full">Loading...</div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5 w-full">
            {prod.map((product: any) => {
              return (
                <ProductItem
                  key={product.slug}
                  product={product}
                  addToCartHandler={addToCartHandler}
                />
              );
            })}
          </div>
        </>
      )}
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

function reducer(state: any, action: any) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, prod: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
