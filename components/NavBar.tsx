import { Menu } from "@headlessui/react";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";
import useWindowDimensions from "../utils/window";
import DropdownLink from "./DropdownLink";
import { IconCart, IconMenu, IconSearch, IconUser } from "./CustomIcons";
import SearchBar from "./SearchBar";

export default function NavBar() {
  const { status, data: session } = useSession();
  const { state, dispatchStore } = useContext(Store);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [menuOpened, setMenuOpened] = useState(false);
  const [profileOpened, setProfileOpened] = useState(false);
  const { width } = useWindowDimensions();
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);

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
      {showSearch ? <SearchBar /> : null}

      <div
        className="text-lg font-semibold text-white cursor-pointer mx-2 ml-3"
        onClick={() => {
          setMenuOpened(!menuOpened);
        }}
      >
        {!menuOpened ? (
          <IconMenu open={false} fill={"white"} className="z-50 md:hidden" />
        ) : (
          <IconMenu open={true} fill={"white"} className="z-50 md:hidden" />
        )}
      </div>

      <Link href="/" className="text-lg font-semibold text-white flex-1">
        GCE
      </Link>

      {/* NAV MENU ITEMS */}
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

      <div className="flex flex-row justify-end items-center flex-1">
        <Link
          className="flex flex-row justify-center items-center mx-1"
          href="/cart"
        >
          {cartItemsCount > 0 && (
            <span className="bg-[var(--blue)] rounded-full text-white px-2 mx-2">
              {cartItemsCount}
            </span>
          )}
          <IconCart open={false} fill={"white"} />
        </Link>

        <div
          className="flex flex-row justify-center items-center mx-1 cursor-pointer"
          onClick={() => {
            setShowSearch(!showSearch);
          }}
        >
          <IconSearch open={true} fill={"white"} />
        </div>

        <Menu as="div" className="relative inline-block">
          <Menu.Button
            className=" py-4 text-white mx-1 mr-4"
            onClick={() => {
              session?.user
                ? setProfileOpened(!profileOpened)
                : router.push("/login");
            }}
          >
            <IconUser fill={"white"} />
          </Menu.Button>

          {session?.user ? (
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
          ) : (
            <></>
          )}
        </Menu>
      </div>
    </nav>
  );
}
