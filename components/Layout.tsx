import Head from "next/head";
import Link from "next/link";
import React, { useContext } from "react";
import { Store } from "../utils/Store";

type LayoutProps = {
  title?: string;
  children?: React.ReactNode;
};

export default function Layout({ title, children }: LayoutProps) {
  const { state } = useContext(Store);

  return (
    <>
      <Head>
        <title>{title ? title + " - GCE" : "Great Comcat Engineering"}</title>
        <meta
          name="description"
          content="Website of Great Comcat Engineering"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col justify-between ">
        {/* NAV BAR */}
        <header>
          <nav className="flex h-12 justify-between items-center bg-[#7D4E57]">
            <Link href="/" className="text-lg font-bold px-6">
              GCE
            </Link>

            <div className="">
              <Link className="p-2" href="/cart">
                Cart
                {state.cart.cartItems.length > 0 && (
                  <span className="bg-red-500 rounded-full text-white px-2 mx-1">
                    {state.cart.cartItems.reduce(
                      (a: any, c: any) => a + c.qty,
                      0
                    )}
                  </span>
                )}
              </Link>
              <Link className="p-6" href="/login">
                Login
              </Link>
            </div>
          </nav>
        </header>

        {/* BODY */}
        <main className="container m-auto mt-4 px-4">{children}</main>

        {/* FOOTER */}
        <footer className="flex h-10 justify-center items-center bg-slate-900">
          <p>Copyright &#169; 2022 Great Comcat Engineering</p>
        </footer>
      </div>
    </>
  );
}
