import axios from "axios";
import error from "next/error";
import Link from "next/link";
import React, { Component, useEffect, useReducer } from "react";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import { Auth } from "../../utils/Auth";
import data from "../../utils/data";
import { getError } from "../../utils/error";

function reducer(state: any, action: any) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, summary: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

export default function AdminDashboardScreen() {
  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/summary`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: summary.salesData.map((x: any) => x._id), // 2022/01 2022/03
    datasets: [
      {
        label: "Sales",
        backgroundColor: "rgba(162, 222, 208, 1)",
        data: summary.salesData.map((x: any) => x.totalSales),
      },
    ],
  };

  return (
    <Auth adminOnly>
      <Layout title="Admin Dashboard">
        <div className="grid md:grid-cols-4 md:gap-5">
          <div>
            <ul className="flex flex-row md:flex-col space-x-4 md:space-x-0 md:space-y-2">
              <li>
                <Link
                  className="bg-[var(--blue)] hover:text-[var(--black)] p-1 rounded-lg"
                  href="/admin/dashboard"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  className="bg-[var(--blue)] hover:text-[var(--black)] p-1 rounded-lg"
                  href="/admin/orders"
                >
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  className="bg-[var(--blue)] hover:text-[var(--black)] p-1 rounded-lg"
                  href="/admin/products"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  className="bg-[var(--blue)] hover:text-[var(--black)] p-1 rounded-lg"
                  href="/admin/users"
                >
                  Users
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <h1 className="mb-4 text-xl font-semibold">Admin Dashboard</h1>
            {loading ? (
              <Loading />
            ) : error ? (
              <div className="alert-error">{error}</div>
            ) : (
              <div>
                <div className="flex flex-col">
                  <div className="card m-5 p-5">
                    <p className="text-3xl">
                      £{summary.ordersPrice.toLocaleString()}{" "}
                    </p>
                    <p className="text-[var(--blue)]">Sales</p>
                    <Link className="text-black" href="/admin/orders">
                      View sales
                    </Link>
                  </div>
                  <div className="card m-5 p-5">
                    <p className="text-3xl">{summary.ordersCount} </p>
                    <p className="text-[var(--blue)]">Orders</p>
                    <Link className="text-black" href="/admin/orders">
                      View orders
                    </Link>
                  </div>
                  <div className="card m-5 p-5">
                    <p className="text-3xl">{summary.productsCount} </p>
                    <p className="text-[var(--blue)]">Products</p>
                    <Link className="text-black" href="/admin/products">
                      View products
                    </Link>
                  </div>
                  <div className="card m-5 p-5">
                    <p className="text-3xl">{summary.usersCount} </p>
                    <p className="text-[var(--blue)]">Users</p>
                    <Link className="text-black" href="/admin/users">
                      View users
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </Auth>
  );
}
