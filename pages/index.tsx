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
        // await new Promise((resolve) => setTimeout(resolve, 10000));
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
          <div className="w-full h-full">
            <svg
              className="mt-[50%] inline mr-2 w-2/6 h-2/6 text-gray-200 animate-spin dark:text-[var(--black)] fill-[var(--blue)]"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
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
