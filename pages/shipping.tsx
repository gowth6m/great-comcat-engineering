import React, { useContext, useEffect } from "react";
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";
import { Auth } from "../utils/Auth";

export default function ShippingScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;

  useEffect(() => {
    setValue("fullName", shippingAddress.fullName);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("postalCode", shippingAddress.postalCode);
    setValue("country", shippingAddress.country);
  }, [setValue, shippingAddress]);

  const submitHandler = ({
    fullName,
    address,
    city,
    postalCode,
    country,
  }: any) => {
    console.log(fullName, address, city, postalCode, country);

    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { fullName, address, city, postalCode, country },
    });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          country,
        },
      })
    );
  };

  return (
    <Auth>
      <Layout title="Shipping">
        <CheckoutWizard activeStep={1} />
        <form
          className="mx-auto max-w-screen-md"
          onSubmit={handleSubmit(submitHandler)}
        >
          <h1 className="mb-4 text-xl">Shipping Address</h1>

          {/* Full Name */}
          <label htmlFor="fullName">Full Name</label>
          <input
            className="w-full"
            id="fullName"
            autoFocus
            {...register("fullName", { required: "Please enter full name" })}
          ></input>
          {errors.fullName && (
            <div className="text-red-500">
              {errors.fullName.message as string}
            </div>
          )}

          {/* Address */}
          <label htmlFor="fullName">Address</label>
          <input
            className="w-full"
            id="address"
            autoFocus
            {...register("address", {
              required: "Please enter valid address",
              minLength: {
                value: 3,
                message: "Address must be at least 3 chars",
              },
            })}
          ></input>
          {errors.address && (
            <div className="text-red-500">
              {errors.address.message as string}
            </div>
          )}

          {/* City */}
          <label htmlFor="fullName">City</label>
          <input
            className="w-full"
            id="city"
            autoFocus
            {...register("city", {
              required: "Please enter valid city",
            })}
          ></input>
          {errors.city && (
            <div className="text-red-500">{errors.city.message as string}</div>
          )}

          {/* PostalCode */}
          <label htmlFor="fullName">Postcode</label>
          <input
            className="w-full"
            id="postcode"
            autoFocus
            {...register("postcode", {
              required: "Please enter valid postcode",
              minLength: {
                value: 5,
                message: "Postcode must be at least 5 chars",
              },
            })}
          ></input>
          {errors.postcode && (
            <div className="text-red-500">
              {errors.postcode.message as string}
            </div>
          )}

          {/* Country */}
          <label htmlFor="fullName">Country</label>
          <input
            className="w-full"
            id="country"
            autoFocus
            {...register("country", {
              required: "Please enter valid country",
            })}
          ></input>
          {errors.country && (
            <div className="text-red-500">
              {errors.country.message as string}
            </div>
          )}

          <div className="mb-4 mt-4 flex justify-between">
            <button className="primary-button">Next</button>
          </div>
        </form>
      </Layout>
    </Auth>
  );
}

ShippingScreen.auth = true;
