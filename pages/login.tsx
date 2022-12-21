import Link from "next/link";
import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { getError } from "../utils/error";
import router, { useRouter } from "next/router";

export default function LoginScreen() {
  const router = useRouter();
  const { data: session } = useSession();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push("/" || redirect);
    }
  }),
    [router, session, redirect];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }: any) => {
    try {
      console.log("trying to login");
      const result = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });
      console.log(result);
    } catch (error) {
      console.log(getError(error));
    }
  };

  return (
    <Layout title="Login">
      <form
        action=""
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Login</h1>
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
            autoFocus
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
                message: "Password must be at least 3 chars",
              },
            })}
            className="w-full"
            id="password"
            autoFocus
          />
          {errors.password && (
            <span className="text-red-500">
              {errors.password.message?.toString()}
            </span>
          )}
        </div>
        <div className="mb-4">
          <button onClick={() => {}} className="primary-button">
            Login
          </button>
        </div>
        <div className="mb-4">
          Don&apos;t have an account? <Link href="/register">Register</Link>
        </div>
      </form>
    </Layout>
  );
}
