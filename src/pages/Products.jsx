import {
  useState,
  useEffect,
  useContext,
} from "react"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

import {
  Link,
} from "react-router-dom"

import {
  WishlistContext,
} from "../context/WishlistContext"

import productsData from "../data/products"

function Products() {
  const [products, setProducts] =
    useState([])

  const [search, setSearch] =
    useState("")

  const [category, setCategory] =
    useState("All")

  const {
    addToWishlist,
    isInWishlist,
  } = useContext(
    WishlistContext
  )

  useEffect(() => {
    setProducts(
      productsData
    )
  }, [])

  const filteredProducts =
    products.filter(
      (product) => {
        const matchesSearch =
          product.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )

        const matchesCategory =
          category ===
            "All" ||
          product.category ===
            category

        return (
          matchesSearch &&
          matchesCategory
        )
      }
    )

  const categories = [
    "All",
    ...new Set(
      products.map(
        (product) =>
          product.category
      )
    ),
  ]

  return (
    <>
      <Navbar />

      <div className="bg-gray-100 min-h-screen px-8 py-12">

        <h1 className="text-5xl font-bold text-center mb-10">
          Our Products
        </h1>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-10">

          <input
            type="text"
            placeholder="Search product..."
            className="border p-4 rounded-2xl w-full md:w-96 shadow-sm"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

          <select
            className="border p-4 rounded-2xl shadow-sm"
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
          >
            {categories.map(
              (
                cat,
                index
              ) => (
                <option
                  key={index}
                  value={cat}
                >
                  {cat}
                </option>
              )
            )}
          </select>
        </div>

        {/* Products */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {filteredProducts.length >
          0 ? (
            filteredProducts.map(
              (
                product
              ) => (
                <div
                  key={
                    product.id
                  }
                  className="bg-white rounded-[35px] overflow-hidden shadow-lg hover:scale-105 transition duration-300 relative"
                >

                  {/* Wishlist */}
                  <button
                    onClick={() =>
                      addToWishlist(
                        product
                      )
                    }
                    className="absolute top-4 right-4 bg-white shadow-md w-12 h-12 rounded-full text-2xl flex items-center justify-center hover:scale-110 transition"
                  >
                    {isInWishlist(
                      product.id
                    )
                      ? "❤️"
                      : "🤍"}
                  </button>

                  {/* Image */}
                  <img
                    src={
                      product.image
                    }
                    alt={
                      product.name
                    }
                    className="h-72 w-full object-cover"
                  />

                  <div className="p-6">

                    <span className="bg-yellow-400 px-4 py-2 rounded-full text-sm font-bold">
                      {
                        product.category
                      }
                    </span>

                    <h2 className="text-2xl font-bold mt-4">
                      {
                        product.name
                      }
                    </h2>

                    <p className="text-gray-500 mt-2 line-clamp-2">
                      {
                        product.description
                      }
                    </p>

                    <p className="text-green-600 text-2xl font-bold mt-4">
                      ₹
                      {
                        product.price
                      }
                    </p>

                    <Link
                      to={`/product/${product.id}`}
                    >
                      <button className="w-full mt-5 bg-black text-white py-4 rounded-2xl font-bold hover:bg-yellow-400 hover:text-black transition">
                        View Product
                      </button>
                    </Link>

                  </div>
                </div>
              )
            )
          ) : (
            <div className="col-span-full text-center text-3xl font-bold text-gray-500 mt-10">
              No Products Found 😢
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Products