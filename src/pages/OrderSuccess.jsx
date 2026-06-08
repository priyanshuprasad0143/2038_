import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function OrderSuccess() {
  const orderId =
    localStorage.getItem(
      "latestOrderId"
    )

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-12">

        <div className="bg-white max-w-2xl w-full rounded-[35px] shadow-2xl p-10 text-center">

          <div className="text-8xl">
            🎉
          </div>

          <h1 className="text-5xl font-bold mt-5 text-green-600">
            Order Placed!
          </h1>

          <p className="text-gray-600 text-lg mt-4">
            Thank you for shopping
            with us.
          </p>

          <div className="bg-gray-100 rounded-2xl p-5 mt-8">
            <p className="text-lg text-gray-500">
              Order ID
            </p>

            <h2 className="text-3xl font-bold text-black mt-2">
              {orderId}
            </h2>
          </div>

          <div className="mt-8 bg-yellow-100 rounded-2xl p-5">
            <h3 className="font-bold text-xl">
              Estimated Delivery 🚚
            </h3>

            <p className="text-gray-700 mt-2">
              Your order will arrive
              within 2 to 5 days.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-10">

            <Link
              to="/orders"
              className="flex-1 bg-black text-white py-4 rounded-2xl text-lg font-bold hover:bg-yellow-400 hover:text-black transition"
            >
              View Orders
            </Link>

            <Link
              to="/products"
              className="flex-1 bg-yellow-400 py-4 rounded-2xl text-lg font-bold hover:scale-105 transition"
            >
              Continue Shopping
            </Link>

          </div>

        </div>

      </div>

      <Footer />
    </>
  )
}

export default OrderSuccess