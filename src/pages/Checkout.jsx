import {
  useContext,
  useState,
} from "react"

import {
  useNavigate,
} from "react-router-dom"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

import {
  CartContext,
} from "../context/CartContext"

function Checkout() {
  const {
    cart,
    setCart,
  } = useContext(
    CartContext
  )

  const navigate =
    useNavigate()

  const [formData, setFormData] =
    useState({
      fullName: "",
      phone: "",
      address: "",
      city: "",
      pincode: "",
    })

  const [coupon, setCoupon] =
    useState("")

  const [discount, setDiscount] =
    useState(0)

  const [
    paymentMethod,
    setPaymentMethod,
  ] = useState("COD")

  const totalPrice =
    cart.reduce(
      (
        total,
        item
      ) =>
        total +
        item.price *
          item.quantity,
      0
    )

  const finalPrice =
    totalPrice -
    discount

  const handleChange = (
    e
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    })
  }

  const applyCoupon =
    () => {
      const code =
        coupon
          .trim()
          .toUpperCase()

      if (
        code ===
        "WELCOME10"
      ) {
        const discountAmount =
          Math.floor(
            totalPrice *
              0.1
          )

        setDiscount(
          discountAmount
        )

        alert(
          "10% Discount Applied ✅"
        )
      } else if (
        code ===
        "SAVE20"
      ) {
        const discountAmount =
          Math.floor(
            totalPrice *
              0.2
          )

        setDiscount(
          discountAmount
        )

        alert(
          "20% Discount Applied ✅"
        )
      } else {
        setDiscount(0)

        alert(
          "Invalid Coupon ❌"
        )
      }
    }

  const handleOrder = (
    e
  ) => {
    e.preventDefault()

    if (
      cart.length === 0
    ) {
      alert(
        "Cart is Empty ❌"
      )
      return
    }

    const orderId =
      "ORD" +
      Math.floor(
        Math.random() *
          1000000
      )

    const newOrder = {
      orderId,
      items: cart,
      totalPrice:
        finalPrice,
      discount,
      coupon,
      paymentMethod,
      address:
        formData,
      status:
        "Pending",
      orderDate:
        new Date().toLocaleString(),
    }

    const existingOrders =
      JSON.parse(
        localStorage.getItem(
          "orders"
        )
      ) || []

    existingOrders.push(
      newOrder
    )

    localStorage.setItem(
      "orders",
      JSON.stringify(
        existingOrders
      )
    )

    localStorage.setItem(
      "latestOrderId",
      orderId
    )

    // Cart Empty after Order
    setCart([])

    alert(
      "Order Placed Successfully 🎉"
    )

    navigate(
      "/order-success"
    )
  }

  return (
    <>
      <Navbar />

      <div className="bg-gray-100 min-h-screen px-6 py-12">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">

          {/* Checkout Form */}
          <div className="bg-white p-8 rounded-[35px] shadow-xl">

            <h1 className="text-4xl font-bold mb-8">
              Checkout
            </h1>

            <form
              onSubmit={
                handleOrder
              }
              className="space-y-5"
            >
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                onChange={
                  handleChange
                }
                className="w-full border p-4 rounded-2xl"
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                onChange={
                  handleChange
                }
                className="w-full border p-4 rounded-2xl"
                required
              />

              <textarea
                name="address"
                placeholder="Delivery Address"
                onChange={
                  handleChange
                }
                className="w-full border p-4 rounded-2xl h-32"
                required
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                onChange={
                  handleChange
                }
                className="w-full border p-4 rounded-2xl"
                required
              />

              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                onChange={
                  handleChange
                }
                className="w-full border p-4 rounded-2xl"
                required
              />

              {/* Coupon */}
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={
                    coupon
                  }
                  onChange={(e) =>
                    setCoupon(
                      e.target
                        .value
                    )
                  }
                  className="flex-1 border p-4 rounded-2xl"
                />

                <button
                  type="button"
                  onClick={
                    applyCoupon
                  }
                  className="bg-yellow-400 px-6 rounded-2xl font-bold"
                >
                  Apply
                </button>
              </div>

              {/* Payment Method */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Select Payment Method
                </h2>

                <div className="space-y-4">

                  <label className="flex items-center gap-3 border p-4 rounded-2xl cursor-pointer">
                    <input
                      type="radio"
                      checked={
                        paymentMethod ===
                        "COD"
                      }
                      onChange={() =>
                        setPaymentMethod(
                          "COD"
                        )
                      }
                    />

                    Cash on Delivery
                  </label>

                  <label className="flex items-center gap-3 border p-4 rounded-2xl cursor-pointer">
                    <input
                      type="radio"
                      checked={
                        paymentMethod ===
                        "UPI"
                      }
                      onChange={() =>
                        setPaymentMethod(
                          "UPI"
                        )
                      }
                    />

                    UPI Payment
                  </label>

                  <label className="flex items-center gap-3 border p-4 rounded-2xl cursor-pointer">
                    <input
                      type="radio"
                      checked={
                        paymentMethod ===
                        "Card"
                      }
                      onChange={() =>
                        setPaymentMethod(
                          "Card"
                        )
                      }
                    />

                    Debit / Credit Card
                  </label>

                </div>
              </div>

              <button className="w-full bg-black text-white py-4 rounded-2xl text-xl font-bold hover:bg-yellow-400 hover:text-black transition">
                Place Order
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-8 rounded-[35px] shadow-xl h-fit">

            <h2 className="text-3xl font-bold mb-6">
              Order Summary
            </h2>

            {cart.map(
              (item) => (
                <div
                  key={item.id}
                  className="flex justify-between border-b py-4"
                >
                  <span>
                    {
                      item.name
                    } ×{" "}
                    {
                      item.quantity
                    }
                  </span>

                  <span>
                    ₹
                    {item.price *
                      item.quantity}
                  </span>
                </div>
              )
            )}

            <div className="mt-8 space-y-4 text-lg">

              <div className="flex justify-between">
                <span>
                  Subtotal
                </span>

                <span>
                  ₹
                  {
                    totalPrice
                  }
                </span>
              </div>

              <div className="flex justify-between text-green-600 font-bold">
                <span>
                  Discount
                </span>

                <span>
                  - ₹
                  {
                    discount
                  }
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
                  Final Total
                </span>

                <span className="text-green-600">
                  ₹
                  {
                    finalPrice
                  }
                </span>
              </div>

            </div>

            {/* Coupons */}
            <div className="mt-8 bg-yellow-100 p-5 rounded-2xl">
              <h3 className="font-bold mb-2">
                Available Coupons
              </h3>

              <p>
                🎁
                <strong>
                  WELCOME10
                </strong>{" "}
                → 10% OFF
              </p>

              <p className="mt-2">
                🔥
                <strong>
                  SAVE20
                </strong>{" "}
                → 20% OFF
              </p>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Checkout