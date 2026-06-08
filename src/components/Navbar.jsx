import { Link } from "react-router-dom"
import {
  useContext,
} from "react"

import {
  CartContext,
} from "../context/CartContext"

import {
  WishlistContext,
} from "../context/WishlistContext"

import {
  AuthContext,
} from "../context/AuthContext"

function Navbar() {
  const { cart } =
    useContext(
      CartContext
    )

  const { wishlist } =
    useContext(
      WishlistContext
    )

  const {
    user,
    logout,
  } = useContext(
    AuthContext
  )

  const isAdmin =
    localStorage.getItem(
      "isAdmin"
    )

  return (
    <nav className="bg-black text-white px-8 py-5 flex justify-between items-center sticky top-0 z-50 shadow-lg">

      {/* Logo */}
      <Link to="/">
        <h1 className="text-3xl font-black text-yellow-400">
          2038
        </h1>
      </Link>

      {/* Menu */}
      <div className="hidden md:flex gap-8 text-lg font-medium">

        <Link
          to="/"
          className="hover:text-yellow-400 transition"
        >
          Home
        </Link>

        <Link
          to="/products"
          className="hover:text-yellow-400 transition"
        >
          Products
        </Link>

        <Link
          to="/about"
          className="hover:text-yellow-400 transition"
        >
          About
        </Link>

        <Link
          to="/contact"
          className="hover:text-yellow-400 transition"
        >
          Contact
        </Link>

        <Link
          to="/orders"
          className="hover:text-yellow-400 transition"
        >
          Orders
        </Link>

        {isAdmin && (
          <Link
            to="/admin"
            className="text-red-400 hover:text-red-300"
          >
            Admin
          </Link>
        )}

      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">

        {/* Wishlist */}
        <Link
          to="/wishlist"
          className="relative bg-pink-500 px-4 py-2 rounded-xl font-bold hover:scale-105 transition"
        >
          ❤️

          {wishlist.length >
            0 && (
            <span className="absolute -top-2 -right-2 bg-white text-black text-xs px-2 py-1 rounded-full">
              {
                wishlist.length
              }
            </span>
          )}
        </Link>

        {/* Cart */}
        <Link
          to="/cart"
          className="relative bg-yellow-400 text-black px-4 py-2 rounded-xl font-bold hover:scale-105 transition"
        >
          🛒

          {cart.length >
            0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-2 py-1 rounded-full">
              {
                cart.length
              }
            </span>
          )}
        </Link>

        {/* Auth */}
        {user ? (
          <div className="flex items-center gap-3">

            <div className="bg-white text-black px-4 py-2 rounded-xl font-semibold">
              Hi,
              {" "}
              {user.name}
              👋
            </div>

            <button
              onClick={
                logout
              }
              className="bg-red-500 px-5 py-2 rounded-xl font-semibold hover:bg-red-600 transition"
            >
              Logout
            </button>

          </div>
        ) : (
          <div className="flex gap-3">

            <Link
              to="/login"
              className="bg-white text-black px-5 py-2 rounded-xl font-semibold"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="bg-yellow-400 text-black px-5 py-2 rounded-xl font-semibold"
            >
              Signup
            </Link>

          </div>
        )}

      </div>
    </nav>
  )
}

export default Navbar