import Link from "next/link";
import Image from "next/image";
import React, { useContext } from "react";
import Layout from "../components/Layout";
import { ProductDataType } from "../utils/data";
import { CartProductDataType, Store } from "../utils/Store";
import { Router, useRouter } from "next/router";

export default function CartScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);

  const {
    cart: { cartItems },
  } = state;

  const removeFromCartHandler = (item: CartProductDataType) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const updateCartHandler = (item: CartProductDataType, qty: any) => {
    const quantity = Number(qty);
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, qty: quantity } });
  };

  return (
    <Layout title="Shopping Cart">
      <h1 className="mb-4 text-xl">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div>
          Cart is empty <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-4 py-2 text-sm font-medium text-left text-gray-500 uppercase bg-gray-100">
                    Item
                  </th>
                  <th className="px-4 py-2 text-sm font-medium text-right text-gray-500 uppercase bg-gray-100">
                    Quantity
                  </th>

                  <th className="px-4 py-2 text-sm font-medium text-right text-gray-500 uppercase bg-gray-100">
                    Price
                  </th>
                  <th className="px-4 py-2 text-sm font-medium text-gray-500 uppercase bg-gray-100">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item: CartProductDataType) => (
                  <tr key={item.slug} className="border-b">
                    <td className="px-4 py-2 text-sm text-left">
                      <Link
                        className="flex items-center"
                        href={"/product/" + item.slug}
                      >
                        <Image
                          src={item.image}
                          alt={item.slug}
                          width={50}
                          height={50}
                        ></Image>
                        &nbsp;
                        {item.name}
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-sm text-right">
                      <select
                        className="bg-white"
                        value={item.qty}
                        onChange={(e) => {
                          console.log("before on change handler ");
                          updateCartHandler(item, e.target.value);
                          console.log("after on change handler");
                          console.log(e.target.value);
                          console.log(item);
                        }}
                      >
                        {Array.from(Array(item.countInStock).keys()).map(
                          (x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          )
                        )}
                      </select>
                    </td>
                    <td className="px-4 py-2 text-sm text-right">
                      {item.price}
                    </td>
                    <td className="px-4 py-2 text-sm text-center">
                      <button
                        onClick={() => {
                          removeFromCartHandler(item);
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5">
            <ul>
              <li>
                <div className="pb-3 text-xl">
                  Subtotal ({cartItems.reduce((a: any, c: any) => a + c.qty, 0)}
                  ) : £
                  {cartItems.reduce((a: any, c: any) => a + c.price * c.qty, 0)}
                </div>
              </li>
              <li>
                <button
                  onClick={() => router.push("shipping")}
                  className="primary-button w-full"
                >
                  Check Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
}
