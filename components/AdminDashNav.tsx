import Link from "next/link";
import React from "react";

type AdminDashNavType = {
  active: number;
};

export default function AdminDashNav({ active }: AdminDashNavType) {
  return (
    <div className="my-2 flex flex-row md:flex-col space-x-4 md:space-x-0 md:space-y-2 bg-[var(--blue)] p-2 md:w-2/6 w-full rounded-lg justify-center align-top h-full">
      <Link
        className={
          active === 0
            ? "bg-[var(--black)] hover:text-[var(--blue)] p-2 rounded-lg"
            : "bg-[var(--blue)] hover:text-[var(--black)] p-2 rounded-lg"
        }
        href="/admin/dashboard"
      >
        Dashboard
      </Link>

      <Link
        className={
          active === 1
            ? "bg-[var(--black)] hover:text-[var(--blue)] p-2 rounded-lg"
            : "bg-[var(--blue)] hover:text-[var(--black)] p-2 rounded-lg"
        }
        href="/admin/orders"
      >
        Orders
      </Link>

      <Link
        className={
          active === 2
            ? "bg-[var(--black)] hover:text-[var(--blue)] p-2 rounded-lg"
            : "bg-[var(--blue)] hover:text-[var(--black)] p-2 rounded-lg"
        }
        href="/admin/products"
      >
        Products
      </Link>

      <Link
        className={
          active === 3
            ? "bg-[var(--black)] hover:text-[var(--blue)] p-2 rounded-lg"
            : "bg-[var(--blue)] hover:text-[var(--black)] p-2 rounded-lg"
        }
        href="/admin/users"
      >
        Users
      </Link>
    </div>
  );
}
