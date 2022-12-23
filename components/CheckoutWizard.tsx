import React from "react";

export default function CheckoutWizard({ activeStep = 0 }) {
  return (
    <div className="mb-5 flex flex-wrap">
      {["User Login", "Shipping Address", "Payment Method", "Place Order"].map(
        (step, index) => (
          <div
            key={step}
            className={
              index <= activeStep
                ? "flex-1 border-b-4 text-center border-[var(--blue)] font-semibold"
                : "flex-1 border-b-4 text-center border-gray-300 "
            }
          >
            {step}
          </div>
        )
      )}
    </div>
  );
}
