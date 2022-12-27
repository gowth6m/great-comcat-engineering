import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
import Layout from "../../components/Layout";
import { Auth } from "../../utils/Auth";
import { getError } from "../../utils/error";

function reducer(state: any, action: any) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

function OrderScreen() {
  const { query } = useRouter();
  const orderId = query.id;

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order, orderId]);

  const {
    shippingAddress,
    isDelivered,
    deliveredAt,
    paymentMethod,
    itemsPrice,
    cartItems,
    totalPrice,
    shippingPrice,
    taxPrice,
    orderItems,
  } = order;

  return (
    <Auth>
      <Layout title={"Order " + orderId}>
        <div className="text-lg font-semibold text-center mb-4">{"Order " + orderId}</div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <div className="flex flex-col md:flex-row w-full justify-center align-top gap-4">
              <div className="flex flex-col w-full md:w-2/6">
                {/* Address */}
                <div className="flex flex-col py-4">
                  <div className="flex flex-col">
                    {shippingAddress.fullName} <br />
                    {shippingAddress.address}, <br />
                    {shippingAddress.city}, {shippingAddress.country}
                    <br />
                    {shippingAddress.postcode}
                  </div>
                  <div className="flex flex-col bg-[var(--blue)] p-2 rounded-xl text-white text-center">
                    {isDelivered ? (
                      <div>Delivered</div>
                    ) : (
                      <div>Not Delivered</div>
                    )}
                  </div>
                </div>
                <hr />

                {/* Payment Method */}
                <div className="flex flex-col py-4">
                  <div className="flex flex-col m-1">{paymentMethod}</div>
                </div>
                <hr />

                {/* Order Items */}
                <div className="flex flex-col py-4">
                  <div className="flex flex-col m-1">
                    {orderItems.map((item: any, index:number) => (
                      <div key={index}>
                        {item.name} ({item.qty}) £{item.price * item.qty}
                      </div>
                    ))}
                    <div className="font-semibold">Subtotal: £{itemsPrice}</div>
                  </div>
                </div>
                <hr />
              </div>

              {/* Order Summary */}
              <div className="flex flex-col py-4 bg-[var(--blue)] p-4 rounded-xl md:w-2/6">
                <div className="flex flex-col mb-2">
                  <div className="flex flex-row justify-between px-2 text-white">
                    <div>Items</div>
                    <div>£{itemsPrice}</div>
                  </div>
                  <div className="flex flex-row justify-between px-2 text-white">
                    <div>Tax</div>
                    <div>£{taxPrice}</div>
                  </div>
                  <div className="flex flex-row justify-between px-2 text-white">
                    <div>Shipping</div>
                    <div>£{shippingPrice}</div>
                  </div>
                  <div className="flex flex-row justify-between px-2 text-white font-semibold">
                    <div>Total</div>
                    <div>£{totalPrice}</div>
                  </div>
                </div>
              </div>
              <br />
            </div>
          </div>
        )}
      </Layout>
    </Auth>
  );
}

export default OrderScreen;
