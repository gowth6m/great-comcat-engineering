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
import IconLogo from "./IconLogo";

export default function NavBar() {
  const { status, data: session } = useSession();
  const { state, dispatchStore } = useContext(Store);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [menuOpened, setMenuOpened] = useState(false);
  const [profileOpened, setProfileOpened] = useState(false);
  const { width } = useWindowDimensions();
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  // const [searchQuery, setSearchQuery] = useState("");

  // const searchSubmitHandler = (e: any) => {
  //   e.preventDefault();
  //   router.push(`/search?searchQuery=${searchQuery}`);
  // };

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
    <nav className="z-50 fixed top-0 w-full flex h-14  mx-0 justify-between items-center bg-[var(--black)]">
      {/* {showSearch ? <SearchBar /> : null} */}

      {showSearch ? (
        <div className="flex flex-row w-full mx-2">
          <SearchBar />
          <div
            className="my-auto mx-2 cursor-pointer"
            onClick={() => {
              setShowSearch(!showSearch);
            }}
          >
            <IconMenu open={true} height="22px" fill="white" />
          </div>
        </div>
      ) : (
        <div className="z-50 fixed top-0 w-full flex h-14  mx-0 justify-between items-center bg-[var(--black)]">
          <div
            className="text-lg font-semibold text-white cursor-pointer mx-2 ml-3"
            onClick={() => {
              setMenuOpened(!menuOpened);
            }}
          >
            {!menuOpened ? (
              <IconMenu
                open={false}
                fill={"white"}
                className="z-50 md:hidden"
              />
            ) : (
              <IconMenu open={true} fill={"white"} className="z-50 md:hidden" />
            )}
          </div>

          <Link
            href="/"
            className="text-lg font-semibold text-white flex-1 mx-0 flex flex-row"
          >
            <IconLogo className="h-12" />
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
            <Link href="/" className="text-lg px-4 py-4 md:py-4">
              HOME
            </Link>
            <Link href="/" className="text-lg px-4 py-4 md:py-4">
              ABOUT
            </Link>
            <Link href="/" className="text-lg px-4 py-4 md:py-4">
              CATEGORIES
            </Link>
            <Link href="/" className="text-lg px-4 pt-4 pb-8 md:py-0">
              CONTACT
            </Link>
          </motion.div>

          <div className="flex flex-row justify-end items-center flex-1">
            <div
              className="flex flex-row justify-center items-center mx-2 cursor-pointer"
              onClick={() => {
                setShowSearch(!showSearch);
              }}
            >
              <IconSearch open={true} fill={"white"} />
            </div>

            <Menu as="div" className="relative inline-block">
              <Menu.Button
                className=" py-4 text-white mx-2"
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
                    className="origin-top bg-[var(--black)] shadow-lg"
                    variants={variantsProfile}
                    animate={profileOpened ? "transform" : "stop"}
                  >
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
                  </motion.div>
                </Menu.Items>
              ) : (
                <></>
              )}
            </Menu>

            <Link
              className="flex flex-row justify-center items-center mx-2 mr-6"
              href="/cart"
            >
              {cartItemsCount > 0 && (
                <span className="bg-[var(--blue)] rounded-full text-white text-xs z-10 absolute w-[22px] h-[22px] top-2 right-2 flex justify-center align-middle">
                  <div className="my-auto">{cartItemsCount}</div>
                </span>
              )}
              <IconCart open={false} fill={"white"} />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
