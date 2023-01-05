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
        <div className="flex flex-col md:flex-row">
          <div className="m-5 flex flex-row md:flex-col space-x-4 md:space-x-0 md:space-y-2 bg-[var(--blue)] p-2 md:w-2/6 rounded-lg justify-center align-top h-full">
            <Link
              className="bg-[var(--black)] hover:text-[var(--blue)] p-2 rounded-lg"
              href="/admin/dashboard"
            >
              Dashboard
            </Link>

            <Link
              className="bg-[var(--blue)] hover:text-[var(--black)] p-2 rounded-lg"
              href="/admin/orders"
            >
              Orders
            </Link>

            <Link
              className="bg-[var(--blue)] hover:text-[var(--black)] p-2 rounded-lg"
              href="/admin/products"
            >
              Products
            </Link>

            <Link
              className="bg-[var(--blue)] hover:text-[var(--black)] p-2 rounded-lg"
              href="/admin/users"
            >
              Users
            </Link>
          </div>

          <div className="md:col-span-3 flex-auto w-full">
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
