import Head from "next/head";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";

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
          content="Website of Great Comcat Engineering LTD"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo/logo.svg" />
      </Head>

      <div className="flex min-h-screen flex-col justify-between ">
        {/* NAV BAR */}
        <header className="w-full">
          <NavBar />
        </header>

        {/* BODY */}
        <main className="container m-auto mt-4 px-4">
          <div>
            <Toaster />
          </div>
          <br />
          <br />
          {children}
        </main>

        {/* FOOTER */}
        <footer className="flex h-20 justify-center items-center bg-[var(--black)] text-white">
          <p>Copyright &#169; 2022 Great Comcat Engineering</p>
        </footer>
      </div>
    </>
  );
}
