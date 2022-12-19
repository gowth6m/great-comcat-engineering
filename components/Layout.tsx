import Head from "next/head";
import Link from "next/link";
import React from "react";

type LayoutProps = {
  title?: string;
  children?: React.ReactNode;
};

export default function Layout({ title, children }: LayoutProps) {
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
        <header>
          <nav className="flex h-12 justify-between items-center bg-slate-900">
            <Link href="/" className="text-lg font-bold px-2">
              GCE
            </Link>

            <div className="">
              <Link className="p-2" href="/cart">
                Cart
              </Link>
              <Link className="p-2" href="/login">
                Login
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 justify-center items-center bg-slate-900">
          <p>Copyright &#169; 2022 Great Comcat Engineering</p>
        </footer>
      </div>
    </>
  );
}
