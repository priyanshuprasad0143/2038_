import {
  useContext,
} from "react"

import {
  Link,
} from "react-router-dom"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

import {
  WishlistContext,
} from "../context/WishlistContext"

function Wishlist() {
  const {
    wishlist,
    addToWishlist,
  } = useContext(
    WishlistContext
  )

  return (
    <>
      <Navbar />

      <div className="bg-gray-100 min-h-screen p-8">

        <h1 className="text-5xl font-bold text-center mb-10">
          ❤️ Wishlist
        </h1>

        {wishlist.length ===
        0 ? (
          <div className="text-center mt-20">
            <h2 className="text-3xl font-bold">
              Wishlist is Empty
            </h2>

            <Link
              to="/products"
            >
              <button className="mt-6 bg-black text-white px-8 py-4 rounded-2xl font-bold">
                Explore Products
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {wishlist.map(
              (product) => (
                <div
                  key={
                    product.id
                  }
                  className="bg-white rounded-[30px] overflow-hidden shadow-lg"
                >
                  <img
                    src={
                      product.image
                    }
                    alt={
                      product.name
                    }
                    className="h-72 w-full object-cover"
                  />

                  <div className="p-5">

                    <h2 className="text-2xl font-bold">
                      {
                        product.name
                      }
                    </h2>

                    <p className="text-green-600 text-xl font-bold mt-3">
                      ₹
                      {
                        product.price
                      }
                    </p>

                    <div className="flex gap-3 mt-5">

                      <Link
                        to={`/product/${product.id}`}
                        className="flex-1"
                      >
                        <button className="w-full bg-black text-white py-3 rounded-xl font-bold">
                          View
                        </button>
                      </Link>

                      <button
                        onClick={() =>
                          addToWishlist(
                            product
                          )
                        }
                        className="bg-red-500 text-white px-5 rounded-xl"
                      >
                        Remove
                      </button>

                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}

export default Wishlist