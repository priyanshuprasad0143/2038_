import {
  useEffect,
  useState,
} from "react"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function Orders() {
  const [orders, setOrders] =
    useState([])

  useEffect(() => {
    const savedOrders =
      JSON.parse(
        localStorage.getItem(
          "orders"
        )
      ) || []

    setOrders(
      savedOrders.reverse()
    )
  }, [])

  const getStatusColor = (
    status
  ) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700"

      case "Cancelled":
        return "bg-red-100 text-red-700"

      default:
        return "bg-yellow-100 text-yellow-700"
    }
  }

  return (
    <>
      <Navbar />

      <div className="bg-gray-100 min-h-screen px-6 py-12">
        <div className="max-w-7xl mx-auto">

          <h1 className="text-5xl font-bold text-center mb-10">
            My Orders
          </h1>

          {orders.length ===
          0 ? (
            <div className="bg-white rounded-[35px] p-12 text-center shadow-lg">
              <h2 className="text-3xl font-bold text-gray-600">
                No Orders Found 😢
              </h2>

              <p className="text-gray-500 mt-3">
                You haven’t placed
                any order yet.
              </p>
            </div>
          ) : (
            <div className="space-y-8">

              {orders.map(
                (
                  order,
                  index
                ) => (
                  <div
                    key={index}
                    className="bg-white rounded-[35px] shadow-xl p-8"
                  >

                    {/* Top */}
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b pb-5">

                      <div>
                        <h2 className="text-2xl font-bold">
                          Order ID:
                          {" "}
                          {
                            order.orderId
                          }
                        </h2>

                        <p className="text-gray-500 mt-2">
                          Ordered on:
                          {" "}
                          {
                            order.orderDate
                          }
                        </p>
                      </div>

                      <div className="mt-4 md:mt-0">
                        <span
                          className={`px-5 py-2 rounded-full font-bold ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status ||
                            "Pending"}
                        </span>
                      </div>

                    </div>

                    {/* Products */}
                    <div className="mt-6 space-y-5">

                      {order.items?.map(
                        (
                          item,
                          i
                        ) => (
                          <div
                            key={i}
                            className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-5 gap-4"
                          >

                            <div className="flex items-center gap-4">

                              <img
                                src={
                                  item.image
                                }
                                alt={
                                  item.name
                                }
                                className="w-24 h-24 object-cover rounded-2xl shadow-md"
                              />

                              <div>
                                <h3 className="font-bold text-xl">
                                  {
                                    item.name
                                  }
                                </h3>

                                <p className="text-gray-500 mt-1">
                                  Qty:
                                  {" "}
                                  {
                                    item.quantity
                                  }
                                </p>

                                <p className="text-sm text-gray-400">
                                  ₹
                                  {
                                    item.price
                                  }
                                  {" "}
                                  each
                                </p>
                              </div>

                            </div>

                            <p className="font-bold text-green-600 text-2xl">
                              ₹
                              {item.price *
                                item.quantity}
                            </p>

                          </div>
                        )
                      )}

                    </div>

                    {/* Bottom */}
                    <div className="mt-8 grid md:grid-cols-2 gap-6">

                      {/* Address */}
                      <div className="bg-gray-100 rounded-3xl p-6">

                        <h3 className="font-bold text-xl mb-4">
                          Delivery Address
                        </h3>

                        <p className="font-semibold">
                          {
                            order.address
                              ?.fullName
                          }
                        </p>

                        <p className="text-gray-600 mt-1">
                          {
                            order.address
                              ?.phone
                          }
                        </p>

                        <p className="text-gray-600 mt-2">
                          {
                            order.address
                              ?.address
                          }
                          ,
                          {" "}
                          {
                            order.address
                              ?.city
                          }
                          {" "}
                          -
                          {" "}
                          {
                            order.address
                              ?.pincode
                          }
                        </p>

                      </div>

                      {/* Payment */}
                      <div className="bg-yellow-100 rounded-3xl p-6">

                        <h3 className="font-bold text-xl mb-4">
                          Payment Details
                        </h3>

                        <p>
                          Payment:
                          {" "}
                          <strong>
                            {order.paymentMethod ||
                              "COD"}
                          </strong>
                        </p>

                        <p className="mt-2">
                          Coupon:
                          {" "}
                          <strong>
                            {order.coupon ||
                              "No Coupon"}
                          </strong>
                        </p>

                        <p className="mt-2">
                          Discount:
                          {" "}
                          <strong>
                            ₹
                            {order.discount ||
                              0}
                          </strong>
                        </p>

                        <div className="border-t mt-5 pt-5">
                          <h2 className="text-3xl font-bold text-green-600">
                            Total:
                            {" "}
                            ₹
                            {
                              order.totalPrice
                            }
                          </h2>
                        </div>

                      </div>

                    </div>

                  </div>
                )
              )}

            </div>
          )}

        </div>
      </div>

      <Footer />
    </>
  )
}

export default Orders