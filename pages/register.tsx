import Link from "next/link";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { getError } from "../utils/error";
import { useRouter } from "next/router";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../components/Loading";

export default function RegisterScreen() {
  const router = useRouter();
  const { data: session }: any = useSession();
  const { redirect } = router.query;
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    if (session?.user) {
      router.push("/" || redirect);
    }
  }),
    [router, session, redirect];

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ name, email, password }: any) => {
    try {
      setRegistering(true);
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });
      const result = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });
      setRegistering(false);

      if (result?.error) {
        toast.error(getError(result?.error) ?? "An error occurred");
      }
    } catch (error) {
      toast.error(getError(error) ?? "An error occurred");
    }
    setRegistering(false);
  };

  return (
    <Layout title="Register">
      {registering ? <Loading /> : <div></div>}
      <form
        action=""
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Login</h1>
        <div className="mb-4">
          <label htmlFor="name">Name</label>
          <input
            type="name"
            {...register("name", {
              required: "Please enter name",
            })}
            className="w-full"
            id="name"
            autoFocus
          />
          {errors.name && (
            <div className="text-red-500">
              {errors.name.message?.toString()}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Please enter email",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: "Please enter valid email",
              },
            })}
            className="w-full"
            id="email"
          />
          {errors.email && (
            <span className="text-red-500">
              {errors.email.message?.toString()}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Please enter password",
              minLength: {
                value: 8,
                message: "Password must be at least 8 chars",
              },
            })}
            className="w-full"
            id="password"
          />
          {errors.password && (
            <span className="text-red-500">
              {errors.password.message?.toString()}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            className="w-full"
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Please enter confirm password",
              validate: (value) => value === getValues("password"),
              minLength: {
                value: 6,
                message: "confirm password is more than 5 chars",
              },
            })}
          />
          {errors.confirmPassword && (
            <div className="text-red-500 ">
              {errors.confirmPassword.message?.toString()}
            </div>
          )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === "validate" && (
              <div className="text-red-500 ">Password do not match</div>
            )}
        </div>

        <div className="mb-4">
          <button onClick={() => {}} className="primary-button">
            Register
          </button>
        </div>
        <div className="mb-4">
          Have an account?{" "}
          <Link className="text-[var(--blue)] hover:text-black" href="/login">
            Login
          </Link>
        </div>
      </form>
    </Layout>
  );
}
