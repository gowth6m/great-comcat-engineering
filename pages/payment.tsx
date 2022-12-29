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
            className="mb-4"
          >
            {["PayPal", "Stripe", "Cash"].map((paymentMethod) => (
              <RadioGroup.Option
                value={paymentMethod}
                key={paymentMethod}
                className="mb-4 cursor-pointer"
              >
                {({ checked }) => (
                  <span
                    className={
                      checked
                        ? "bg-[var(--black)] p-2 rounded-xl text-white"
                        : "p-2 rounded-xl"
                    }
                  >
                    {paymentMethod}
                  </span>
                )}
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
