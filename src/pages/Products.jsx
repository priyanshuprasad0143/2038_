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
    import productsData from "../data/products"

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

      <div className="bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen px-8 py-12">

        <h1 className="text-5xl font-bold text-center mb-3">
          Our Products
        </h1>

        <p className="text-center text-gray-500 mb-10 text-lg">
          Find your favorite items
        </p>

        {/* Search + Filter */}
        <div className="bg-white p-5 rounded-[30px] shadow-lg flex flex-col md:flex-row gap-4 justify-between items-center mb-12 max-w-5xl mx-auto">

          <input
            type="text"
            placeholder="🔍 Search product..."
            className="border p-4 rounded-2xl w-full md:w-[70%] outline-none focus:ring-2 focus:ring-yellow-400"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

          <select
            className="border p-4 rounded-2xl w-full md:w-[30%] outline-none focus:ring-2 focus:ring-yellow-400"
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
                  key={
                    index
                  }
                  value={cat}
                >
                  {cat}
                </option>
              )
            )}
          </select>
        </div>

        {/* Total Products */}
        <div className="max-w-7xl mx-auto mb-6">
          <p className="text-gray-600 text-lg font-medium">
            Showing{" "}
            <span className="font-bold text-black">
              {
                filteredProducts.length
              }
            </span>{" "}
            products
          </p>
        </div>

        {/* Products */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">

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
                  className="bg-white rounded-[35px] overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300 relative"
                >

                  {/* Wishlist */}
                  <button
                    onClick={() =>
                      addToWishlist(
                        product
                      )
                    }
                    className="absolute top-4 right-4 bg-white shadow-md w-12 h-12 rounded-full text-2xl flex items-center justify-center hover:scale-110 transition z-10"
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

                    <h2 className="text-2xl font-bold mt-4 line-clamp-1">
                      {
                        product.name
                      }
                    </h2>

                    <p className="text-gray-500 mt-2 line-clamp-2 h-12">
                      {
                        product.description
                      }
                    </p>

                    <div className="flex justify-between items-center mt-5">

                      <p className="text-green-600 text-2xl font-bold">
                        ₹
                        {
                          product.price
                        }
                      </p>

                      <span className="text-yellow-500 font-bold">
                        ⭐ 4.9
                      </span>
                    </div>

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
            <div className="col-span-full text-center mt-20">

              <h2 className="text-4xl font-bold text-gray-500">
                No Products Found 😢
              </h2>

              <p className="text-gray-400 mt-3">
                Try another search or category
              </p>

            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Products