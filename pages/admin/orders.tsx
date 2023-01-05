import axios from "axios";
import Link from "next/link";
import React, { useEffect, useReducer } from "react";
import AdminDashNav from "../../components/AdminDashNav";
import { IconDelivery, IconMoney } from "../../components/CustomIcons";
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
    <Auth adminOnly>
      <Layout title="Admin Dashboard">
        <div className="flex flex-col md:flex-row">
          <AdminDashNav active={1} />
          <div className="overflow-x-auto md:col-span-3 flex-auto w-full">
            {loading ? (
              <Loading />
            ) : error ? (
              <div className="alert-error">{error}</div>
            ) : (
              <div className="">
                <table className="min-w-full">
                  <tbody>
                    {orders.map((order: any) => (
                      <div
                        key={order.id}
                        className="flex flex-col m-2 card p-2 rounded-lg space-y-1"
                      >
                        <div className="flex flex-row justify-between">
                          <div className="flex flex-row">
                            <div className="font-semibold">
                              Order {order._id.substring(20, 24)}
                            </div>
                            <div className="px-1">
                              @{order.user ? order.user.name : "DELETED USER"}
                            </div>
                          </div>

                          <Link
                            className="primary-button"
                            href={`/order/${order._id}`}
                            passHref
                          >
                            Details
                          </Link>
                        </div>

                        <div>
                          £{order.totalPrice.toLocaleString("en", options)}
                        </div>
                        <div>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>

                        <div className="flex flex-row bg-[var(--blue)] justify-center p-2 rounded-lg">
                          <div className="flex flex-row flex-1 justify-center text-white">
                            <IconMoney className="mx-1" fill="white" />
                            {order.isPaid
                              ? `${new Date(order.paidAt).toLocaleDateString()}`
                              : "Not paid"}
                          </div>
                          <div className="flex flex-row flex-1 justify-center text-white">
                            <IconDelivery className="mx-1" fill="white" />
                            {order.isDelivered
                              ? `${new Date(
                                  order.deliveredAt
                                ).toLocaleDateString()}`
                              : "Not delivered"}
                          </div>
                        </div>
                      </div>
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

const options = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};
