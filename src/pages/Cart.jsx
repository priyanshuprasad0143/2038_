import { useContext } from "react"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { CartContext } from "../context/CartContext"

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext)

  const totalPrice = cart.reduce(
    (total, item) =>
      total +
      item.price * item.quantity,
    0
  )

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 px-6 py-12">

        <h1 className="text-5xl font-bold text-center mb-4">
          Your Cart
        </h1>

        <p className="text-center text-gray-500 mb-12 text-lg">
          Review your items before checkout
        </p>

        {cart.length === 0 ? (
          <div className="max-w-xl mx-auto bg-white rounded-[35px] shadow-xl p-12 text-center">

            <div className="text-8xl mb-5">
              🛒
            </div>

            <h2 className="text-4xl font-bold text-gray-700">
              Cart is Empty
            </h2>

            <p className="text-gray-500 mt-4 text-lg">
              Looks like you haven’t
              added anything yet
            </p>

            <Link to="/products">
              <button className="mt-8 bg-yellow-400 text-black px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition">
                Continue Shopping
              </button>
            </Link>

          </div>
        ) : (
          <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">

            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-5">

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-5 rounded-[30px] shadow-lg flex flex-col md:flex-row justify-between items-center gap-5 hover:shadow-2xl transition"
                >

                  {/* Product Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 object-cover rounded-2xl"
                  />

                  {/* Product Info */}
                  <div className="flex-1 text-center md:text-left">

                    <h2 className="text-2xl font-bold">
                      {item.name}
                    </h2>

                    <p className="text-gray-500 mt-1">
                      Price: ₹
                      {item.price}
                    </p>

                    <p className="text-green-600 font-bold mt-2">
                      Total: ₹
                      {item.price *
                        item.quantity}
                    </p>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-3">

                    <button
                      onClick={() =>
                        decreaseQuantity(
                          item.id
                        )
                      }
                      className="bg-red-500 text-white w-10 h-10 rounded-full text-xl hover:scale-110 transition"
                    >
                      −
                    </button>

                    <span className="text-2xl font-bold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.id
                        )
                      }
                      className="bg-green-500 text-white w-10 h-10 rounded-full text-xl hover:scale-110 transition"
                    >
                      +
                    </button>

                  </div>

                  {/* Remove */}
                  <button
                    onClick={() =>
                      removeFromCart(
                        item.id
                      )
                    }
                    className="bg-black text-white px-5 py-3 rounded-2xl hover:bg-red-500 transition font-semibold"
                  >
                    Remove
                  </button>

                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-white rounded-[35px] shadow-xl p-8 h-fit sticky top-24">

              <h2 className="text-3xl font-bold mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 text-lg">

                <div className="flex justify-between">
                  <span>
                    Items
                  </span>

                  <span>
                    {cart.length}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>
                    Delivery
                  </span>

                  <span className="text-green-600 font-bold">
                    FREE
                  </span>
                </div>

                <hr />

                <div className="flex justify-between text-3xl font-bold">
                  <span>
                    Total
                  </span>

                  <span className="text-green-600">
                    ₹
                    {totalPrice}
                  </span>
                </div>

              </div>

              <Link to="/checkout">
                <button className="w-full mt-8 bg-yellow-400 text-black py-4 rounded-2xl font-bold text-xl hover:scale-105 transition">
                  Proceed to Checkout
                </button>
              </Link>

              <Link to="/products">
                <button className="w-full mt-4 border-2 border-black py-4 rounded-2xl font-bold text-lg hover:bg-black hover:text-white transition">
                  Continue Shopping
                </button>
              </Link>

            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}

export default Cart