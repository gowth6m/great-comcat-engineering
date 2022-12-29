import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/Layout";
import { Auth } from "../utils/Auth";
import { Store } from "../utils/Store";
import toast from "react-hot-toast";
import { RadioGroup } from "@headlessui/react";

export default function PaymentScreen() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const { state, dispatchStore } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;

  const router = useRouter();

  const submitHandler = (e: any) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      toast.error("Please select a payment method");
    }
    dispatchStore({
      type: "SAVE_PAYMENT_METHOD",
      payload: selectedPaymentMethod,
    });
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
          <RadioGroup
            value={selectedPaymentMethod}
            onChange={setSelectedPaymentMethod}
            className="mb-4 flex flex-col md:flex-row w-full justify-between items-center gap-2"
          >
            {["PayPal", "Stripe", "Cash"].map((paymentMethod) => (
              <RadioGroup.Option
                value={paymentMethod}
                key={paymentMethod}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-[var(--blue)]"
                      : ""
                  }
                ${
                  checked
                    ? "bg-[var(--black)] bg-opacity-75 text-white"
                    : "bg-white"
                }
                  relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none mb-1 w-full`
                }
              >
                {({ checked }) => <span>{paymentMethod}</span>}
              </RadioGroup.Option>
            ))}
          </RadioGroup>
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
