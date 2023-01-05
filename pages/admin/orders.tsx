import axios from "axios";
import Link from "next/link";
import React, { useEffect, useReducer } from "react";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import { Auth } from "../../utils/Auth";
import { getError } from "../../utils/error";

function reducer(state: any, action: any) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orders: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

export default function AdminOrderScreen() {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/orders`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  return (
    <Auth>
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
                  className="bg-[var(--black)] hover:text-[var(--blue)] p-1 rounded-lg"
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
          <div className="overflow-x-auto md:col-span-3">
            <h1 className="mb-4 text-xl">Admin Orders</h1>

            {loading ? (
              <Loading />
            ) : error ? (
              <div className="alert-error">{error}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="px-5 text-left">ID</th>
                      <th className="p-5 text-left">USER</th>
                      <th className="p-5 text-left">DATE</th>
                      <th className="p-5 text-left">TOTAL</th>
                      <th className="p-5 text-left">PAID</th>
                      <th className="p-5 text-left">DELIVERED</th>
                      <th className="p-5 text-left">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order: any) => (
                      <tr key={order._id} className="border-b">
                        <td className="p-5">{order._id.substring(20, 24)}</td>
                        <td className="p-5">
                          {order.user ? order.user.name : "DELETED USER"}
                        </td>
                        <td className="p-5">
                          {order.createdAt.substring(0, 10)}
                        </td>
                        <td className="p-5">
                          £{order.totalPrice.toLocaleString()}
                        </td>
                        <td className="p-5">
                          {order.isPaid
                            ? `${order.paidAt.substring(0, 10)}`
                            : "not paid"}
                        </td>
                        <td className="p-5">
                          {order.isDelivered
                            ? `${order.deliveredAt.substring(0, 10)}`
                            : "not delivered"}
                        </td>
                        <td className="p-5">
                          <Link className="primary-button" href={`/order/${order._id}`} passHref>
                            Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </Auth>
  );
}