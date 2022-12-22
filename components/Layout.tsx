import Head from "next/head";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import { Store } from "../utils/Store";
import { Menu } from "@headlessui/react";
import { useSession } from "next-auth/react";
import Cookies from "js-cookie";
import DropdownLink from "./DropdownLink";
import { signOut } from "next-auth/react";
import {
  faShoppingBasket,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type LayoutProps = {
  title?: string;
  children?: React.ReactNode;
};

export default function Layout({ title, children }: LayoutProps) {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const [cartItemsCount, setCartItemsCount] = React.useState(0);
  const [menuOpened, setMenuOpened] = React.useState(false);

  useEffect(() => {
    setCartItemsCount(
      state.cart.cartItems.reduce((a: any, c: any) => a + c.qty, 0)
    );
  }, [cartItemsCount, state.cart.cartItems]);

  const logoutHandler = async () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({
      callbackUrl: "/login",
    });
  };

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
          <nav className="fixed w-full flex h-12 justify-between items-center bg-[#7D4E57]">
            <Link
              href="#"
              className="text-lg font-bold px-6"
              onClick={() => {
                setMenuOpened(!menuOpened);
              }}
            >
              {!menuOpened ? (
                <FontAwesomeIcon icon={faBars} className="mx-2 w-7" />
              ) : (
                <FontAwesomeIcon icon={faXmark} className="mx-2 w-7" />
              )}
            </Link>

            <Link href="/" className="text-lg font-bold px-6">
              GCE
            </Link>

            <div className="flex flex-row justify-center items-center">
              <Link
                className="p-2 flex flex-row justify-center items-center"
                href="/cart"
              >
                {cartItemsCount > 0 && (
                  <span className="bg-red-500 rounded-full text-white px-2 mx-1">
                    {cartItemsCount}
                  </span>
                )}
                <FontAwesomeIcon icon={faShoppingBasket} className="mx-2 w-7" />
              </Link>

              {/* PROFILE BUTTON OR SIGN IN BUTTON */}
              {status === "loading" ? (
                "Loading"
              ) : session?.user ? (
                // <Link className="p-6" href="/">{session.user.name!.split(" ")[0]}</Link>
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="p-2">{session.user.name}</Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white shadow-lg">
                    <DropdownLink className="dropdown-link" href="/profile">
                      Profile
                    </DropdownLink>
                    <DropdownLink
                      className="dropdown-link"
                      href="/order-history"
                    >
                      Order History
                    </DropdownLink>
                    <DropdownLink
                      className="dropdown-link"
                      href="#"
                      onClick={() => {
                        logoutHandler();
                      }}
                    >
                      Logout
                    </DropdownLink>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link className="p-6" href="/login">
                  Login
                </Link>
              )}
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
