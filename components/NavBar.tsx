import {
  faBars,
  faShoppingBasket,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "@headlessui/react";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";
import useWindowDimensions from "../utils/window";
import DropdownLink from "./DropdownLink";

export default function NavBar() {
  const { status, data: session } = useSession();
  const { state, dispatchStore } = useContext(Store);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [menuOpened, setMenuOpened] = useState(false);
  const [profileOpened, setProfileOpened] = useState(false);
  const { width } = useWindowDimensions();

  useEffect(() => {
    setCartItemsCount(
      state.cart.cartItems.reduce((a: any, c: any) => a + c.qty, 0)
    );
  }, [cartItemsCount, state.cart.cartItems]);

  const logoutHandler = async () => {
    Cookies.remove("cart");
    dispatchStore({ type: "CART_RESET" });
    signOut({
      callbackUrl: "/login",
    });
  };

  const variants = {
    transform: {
      scaleY: [0, 1.2, 1],
      scaleX: [1, 1.2, 1],
      transition: { duration: 0.5 },
    },
  };

  const variantsProfile = {
    transform: {
      scaleY: [0, 1.2, 1],
      transition: { duration: 0.5 },
    },
  };

  return (
    <nav className="fixed w-full flex h-12  mx-0 justify-between items-center bg-[var(--black)]">
      <div
        className="text-lg font-bold px-4 text-white"
        onClick={() => {
          setMenuOpened(!menuOpened);
        }}
      >
        {!menuOpened ? (
          <FontAwesomeIcon icon={faBars} className="z-50 mx-2 w-7 md:hidden" />
        ) : (
          <FontAwesomeIcon icon={faXmark} className="z-50 mx-2 w-7 md:hidden" />
        )}
      </div>

      <Link href="/" className="text-lg font-bold text-white flex-1">
        GCE
      </Link>

      <motion.div
        className={
          menuOpened
            ? "navbar origin-top"
            : "hidden" +
              (Number(width) > 768
                ? "hidden md:flex justify-center items-center flex-auto"
                : "")
        }
        variants={variants}
        animate={menuOpened ? "transform" : "stop"}
      >
        <Link href="/" className="text-lg font-bold px-4 py-4 md:py-4">
          Home
        </Link>
        <Link href="/" className="text-lg font-bold px-4 py-4 md:py-4">
          Categories
        </Link>
        <Link href="/" className="text-lg font-bold px-4 py-4 md:py-4">
          My Account
        </Link>
        <Link href="/" className="text-lg font-bold px-4 pt-4 pb-8 md:py-0">
          Contact
        </Link>
      </motion.div>

      <div className="flex flex-row justify-end items-center flex-1 pr-6">
        <Link
          className="flex flex-row justify-center items-center"
          href="/cart"
        >
          {cartItemsCount > 0 && (
            <span className="bg-[var(--blue)] rounded-full text-white px-2">
              {cartItemsCount}
            </span>
          )}
          <FontAwesomeIcon icon={faShoppingBasket} className="ml-2 w-7" />
        </Link>

        {/* PROFILE BUTTON OR SIGN IN BUTTON */}
        {status === "loading" ? (
          "Loading"
        ) : session?.user ? (
          // <Link className="p-6" href="/">{session.user.name!.split(" ")[0]}</Link>
          <Menu as="div" className="relative inline-block">
            <Menu.Button
              className=" py-4 text-white"
              onClick={() => {
                setProfileOpened(!profileOpened);
              }}
            >
              <FontAwesomeIcon icon={faUser} className="w-7" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 w-56 origin-top-right">
              <motion.div
                className="origin-top bg-white shadow-lg"
                variants={variantsProfile}
                animate={profileOpened ? "transform" : "stop"}
              >
                <DropdownLink className="dropdown-link" href="/profile">
                  Profile
                </DropdownLink>
                <DropdownLink className="dropdown-link" href="/order-history">
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
              </motion.div>
            </Menu.Items>
          </Menu>
        ) : (
          <Link className="p-6" href="/login">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
