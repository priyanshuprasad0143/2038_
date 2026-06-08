import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

function Home() {
  const [products, setProducts] =
    useState([])

  useEffect(() => {
    const savedProducts =
      JSON.parse(
        localStorage.getItem(
          "adminProducts"
        )
      ) || []

    setProducts(
      savedProducts.slice(0, 4)
    )
  }, [])

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-black text-white min-h-[90vh] flex items-center px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">

          <div>
            <span className="bg-yellow-400 text-black px-5 py-2 rounded-full font-bold">
              Premium Products by 2028 Company
            </span>

            <h1 className="text-6xl lg:text-8xl font-black mt-6 leading-tight">
              Welcome to{" "}
              <span className="text-yellow-400">
                2038
              </span>
            </h1>

            <p className="text-xl text-gray-300 mt-6 leading-8">
              Premium food, drinks,
              chocolates and more.
              Everything managed by
              your 2028 Company.
            </p>

            <div className="flex gap-5 mt-8 flex-wrap">
              <Link
                to="/products"
                className="bg-yellow-400 text-black px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition"
              >
                Explore Products
              </Link>

              <Link
                to="/about"
                className="border border-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-black transition"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200"
              alt="food"
              className="rounded-[40px] shadow-2xl h-[550px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-100 py-20 px-8">
        <div className="max-w-7xl mx-auto">

          <h2 className="text-5xl font-bold text-center mb-4">
            Featured Products
          </h2>

          <p className="text-center text-gray-500 text-lg mb-14">
            Products managed from Admin Panel
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map(
              (product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="bg-white rounded-[35px] overflow-hidden shadow-lg hover:scale-105 transition duration-300"
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

                  <div className="p-6">
                    <h3 className="text-2xl font-bold">
                      {
                        product.name
                      }
                    </h3>

                    <p className="text-green-600 text-2xl font-bold mt-3">
                      ₹
                      {
                        product.price
                      }
                    </p>

                    <button className="w-full mt-5 bg-black text-white py-4 rounded-2xl font-bold hover:bg-yellow-400 hover:text-black transition">
                      View Product
                    </button>
                  </div>
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="bg-black text-white py-20 px-8">
        <div className="max-w-7xl mx-auto text-center">

          <h2 className="text-5xl font-bold mb-14">
            Why Choose 2038?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="bg-zinc-900 p-8 rounded-[35px]">
              <h3 className="text-3xl mb-4">
                🚀
              </h3>

              <h3 className="text-2xl font-bold">
                Fast Delivery
              </h3>
            </div>

            <div className="bg-zinc-900 p-8 rounded-[35px]">
              <h3 className="text-3xl mb-4">
                ⭐
              </h3>

              <h3 className="text-2xl font-bold">
                Premium Quality
              </h3>
            </div>

            <div className="bg-zinc-900 p-8 rounded-[35px]">
              <h3 className="text-3xl mb-4">
                🥗
              </h3>

              <h3 className="text-2xl font-bold">
                Fresh Products
              </h3>
            </div>

            <div className="bg-zinc-900 p-8 rounded-[35px]">
              <h3 className="text-3xl mb-4">
                ❤️
              </h3>

              <h3 className="text-2xl font-bold">
                Trusted Brand
              </h3>
            </div>

          </div>
        </div>
      </section>

      {/* Offer */}
      <section className="bg-yellow-400 py-16 text-center px-8">
        <h2 className="text-5xl font-black">
          Get 20% OFF
        </h2>

        <p className="text-xl mt-4">
          On your first order from 2038
        </p>
      </section>

      <Footer />
    </>
  )
}

export default Home