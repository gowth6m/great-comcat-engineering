import axios from "axios";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/Layout";
import { Auth } from "../utils/Auth";
import { getError } from "../utils/error";
import { Store } from "../utils/Store";

export default function PlaceOrderScreen() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod, cartItems } = cart;
  const [loading, setLoading] = useState(false);

  const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100;
  const itemsPrice = round2(
    cartItems.reduce((a: any, c: any) => a + c.price * c.qty, 0)
  );

  const shippingPrice = itemsPrice > 200 ? 0 : 10;
  const taxPrice = round2(0.2 * itemsPrice);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  const router = useRouter();
  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
  }, [paymentMethod, router]);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/orders", {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      setLoading(false);
      dispatch({ type: "CART_CLEAR_ITEMS" });
      Cookies.set("cart", JSON.stringify({ ...cart, cartItems: [] }));
      router.push(`/order/${data._id}`);
    } catch (error) {
      setLoading(false);
      window.alert(getError(error));
    }
  };

  return (
    <Auth>
      <Layout title="Place Order">
        <CheckoutWizard activeStep={3} />

        {cartItems.length === 0 ? (
          <div>
            Cart is empty{" "}
            <Link className="primary-button" href="/">
              Go Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row w-full justify-center align-top">
            <div className="flex flex-col w-full md:w-2/6">
              {/* Address */}
              <div className="flex flex-col py-4">
                <div className="flex flex-col">
                  {shippingAddress.fullName} <br />
                  {shippingAddress.address}, <br />
                  {shippingAddress.city}, {shippingAddress.country}
                  <br />
                  {shippingAddress.postcode}
                </div>
                <div className="flex flex-col">
                  <Link className="primary-button md:w-1/6" href="/shipping">
                    Edit
                  </Link>
                </div>
              </div>
              <hr />

              {/* Payment Method */}
              <div className="flex flex-col py-4">
                <div className="flex flex-col mb-2">{paymentMethod}</div>
                <div className="flex flex-col">
                  <Link className="primary-button md:w-1/6" href="/shipping">
                    Edit
                  </Link>
                </div>
              </div>
              <hr />

              {/* Order Items */}
              <div className="flex flex-col py-4">
                <div className="flex flex-col mb-2">
                  {cartItems.map((item: any) => (
                    <div key={item.slug}>
                      {item.name} ({item.qty}) £{item.price * item.qty}
                    </div>
                  ))}
                  <div className="font-semibold">Subtotal: £{itemsPrice}</div>
                </div>
                <div className="flex flex-col">
                  <Link className="primary-button md:w-1/6" href="/cart">
                    Edit
                  </Link>
                </div>
              </div>
              <hr />
            </div>

            {/* Order Summary */}
            <div className="flex flex-col py-4 bg-[var(--blue)] p-4 rounded-xl md:w-2/6">
              <div className="flex flex-col mb-2">
                <div className="flex flex-row justify-between px-2 text-white">
                  <div>Items</div>
                  <div>£{itemsPrice}</div>
                </div>
                <div className="flex flex-row justify-between px-2 text-white">
                  <div>Tax</div>
                  <div>£{taxPrice}</div>
                </div>
                <div className="flex flex-row justify-between px-2 text-white">
                  <div>Shipping</div>
                  <div>£{shippingPrice}</div>
                </div>
                <div className="flex flex-row justify-between px-2 text-white font-semibold">
                  <div>Total</div>
                  <div>£{totalPrice}</div>
                </div>
              </div>

              <div className="flex flex-col">
                <button
                  disabled={loading}
                  onClick={placeOrderHandler}
                  className="secondary-button"
                >
                  {loading ? "Loading..." : "Place Order"}
                </button>
              </div>
            </div>
            <br />
          </div>
        )}
      </Layout>
    </Auth>
  );
}
