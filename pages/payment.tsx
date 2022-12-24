import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/Layout";
import { Auth } from "../utils/Auth";
import { Store } from "../utils/Store";

export default function PaymentScreen() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const { state, dispatchStore } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;

  const router = useRouter();

  const submitHandler = (e: any) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      console.log("Please select a payment method");
      return window.alert("Please select a payment method");
    }
    dispatchStore({ type: "SAVE_PAYMENT_METHOD", payload: selectedPaymentMethod });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );

    router.push("/placeorder");
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      router.push("/shipping");
    } else {
      setSelectedPaymentMethod(paymentMethod || "");
    }
  }, [paymentMethod, router, shippingAddress.address]);

  return (
    <Auth>
      <Layout title="Payment">
        <CheckoutWizard activeStep={2} />
        <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
          <h1 className="mb-4 text-xl">Payment Method</h1>
          {["PayPal", "Stripe", "Cash"].map((paymentMethod) => (
            <div key={paymentMethod} className="mb-4">
              <input
                name="paymentMethod"
                type="radio"
                className="p-2 outline-none focus:ring-0"
                id={paymentMethod}
                checked={selectedPaymentMethod === paymentMethod}
                onChange={() => setSelectedPaymentMethod(paymentMethod)}
              />
              <label className="p-2" htmlFor={paymentMethod}>
                {paymentMethod}
              </label>
            </div>
          ))}
          <div className="mb-4 flex justify-between">
            <button
              className="default-button"
              type="button"
              onClick={() => {
                router.push("/shipping");
              }}
            >
              Back
            </button>
            <button
              className="primary-button"
              type="button"
            //   onClick={() => {
            //     router.push("/placeorder");
            //   }}
              onClick={submitHandler}
            >
              Next
            </button>
          </div>
        </form>
      </Layout>
    </Auth>
  );
}
