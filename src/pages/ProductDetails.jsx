import {
  useParams,
  Link,
  useNavigate,
} from "react-router-dom"

import {
  useContext,
  useState,
  useEffect,
} from "react"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

import {
  CartContext,
} from "../context/CartContext"

import {
  WishlistContext,
} from "../context/WishlistContext"

function ProductDetails() {
  const { id } =
    useParams()

  const navigate =
    useNavigate()

  const {
    addToCart,
  } = useContext(
    CartContext
  )

  const {
    addToWishlist,
    isInWishlist,
  } = useContext(
    WishlistContext
  )

  const [product, setProduct] =
    useState(null)

  const [products, setProducts] =
    useState([])

  const [quantity, setQuantity] =
    useState(1)

  const [reviews, setReviews] =
    useState([])

  const [rating, setRating] =
    useState(5)

  const [comment, setComment] =
    useState("")

  useEffect(() => {
    const savedProducts =
      JSON.parse(
        localStorage.getItem(
          "adminProducts"
        )
      ) || []

    setProducts(
      savedProducts
    )

    const foundProduct =
      savedProducts.find(
        (item) =>
          item.id ===
          Number(id)
      )

    setProduct(
      foundProduct
    )

    const savedReviews =
      JSON.parse(
        localStorage.getItem(
          `reviews-${id}`
        )
      ) || []

    setReviews(
      savedReviews
    )
  }, [id])

  if (!product) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <h1 className="text-4xl font-bold">
            Product Not Found 😢
          </h1>
        </div>

        <Footer />
      </>
    )
  }

  const relatedProducts =
    products.filter(
      (item) =>
        item.category ===
          product.category &&
        item.id !==
          product.id
    )

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (
              total,
              review
            ) =>
              total +
              review.rating,
            0
          ) /
          reviews.length
        ).toFixed(1)
      : 4.9

  const handleAddToCart =
    () => {
      for (
        let i = 0;
        i < quantity;
        i++
      ) {
        addToCart(product)
      }

      alert(
        `${quantity} item added to cart ✅`
      )
    }

  const handleBuyNow =
    () => {
      for (
        let i = 0;
        i < quantity;
        i++
      ) {
        addToCart(product)
      }

      navigate(
        "/checkout"
      )
    }

    const handleReviewSubmit =
    () => {
      const loggedUser =
        JSON.parse(
          localStorage.getItem(
            "loggedInUser"
          )
        )

      if (!loggedUser) {
        alert(
          "Please login first"
        )
        return
      }

      if (
        !comment.trim()
      ) {
        alert(
          "Please write a review"
        )
        return
      }

      const newReview = {
        id: Date.now(),
        name:
          loggedUser.name,
        rating,
        comment,
        date:
          new Date().toLocaleDateString(),
      }

      const updatedReviews =
        [
          newReview,
          ...reviews,
        ]

      setReviews(
        updatedReviews
      )

      localStorage.setItem(
        `reviews-${id}`,
        JSON.stringify(
          updatedReviews
        )
      )

      setComment("")
      setRating(5)

      alert(
        "Review Added ✅"
      )
    }

  return (
    <>
      <Navbar />

      <div className="bg-gray-100 min-h-screen py-12 px-6">

        {/* Product */}
        <div className="max-w-7xl mx-auto bg-white rounded-[40px] shadow-xl p-8 lg:p-12">

          <div className="grid lg:grid-cols-2 gap-14">

            {/* Image */}
            <div className="relative">

              <img
                src={
                  product.image
                }
                alt={
                  product.name
                }
                className="w-full h-[550px] object-cover rounded-[35px] shadow-lg"
              />

              <button
                onClick={() =>
                  addToWishlist(
                    product
                  )
                }
                className="absolute top-5 right-5 bg-white shadow-lg w-14 h-14 rounded-full text-3xl flex items-center justify-center hover:scale-110 transition"
              >
                {isInWishlist(
                  product.id
                )
                  ? "❤️"
                  : "🤍"}
              </button>

            </div>

            {/* Details */}
            <div>

              <div className="flex items-center gap-4">

                <span className="bg-yellow-400 px-5 py-2 rounded-full font-bold">
                  {
                    product.category
                  }
                </span>

                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                  In Stock
                </span>

              </div>

              <h1 className="text-5xl font-bold mt-5">
                {
                  product.name
                }
              </h1>

              <div className="flex items-center gap-3 mt-4">
                <span className="text-2xl">
                  ⭐⭐⭐⭐⭐
                </span>

                <span className="text-gray-500">
                  {averageRating}
                  {" "}
                  Rating
                </span>
              </div>

              <h2 className="text-5xl font-bold text-green-600 mt-7">
                ₹
                {
                  product.price
                }
              </h2>

              <div className="mt-5 bg-gray-100 rounded-2xl p-4">
                🚚 Free Delivery in
                2 to 5 Days
              </div>

              <div className="mt-8">
                <h3 className="text-2xl font-bold mb-3">
                  Description
                </h3>

                <p className="text-gray-600 text-lg leading-8">
                  {
                    product.description
                  }
                </p>
              </div>

              {/* Quantity */}
              <div className="mt-8">
                <h3 className="font-bold text-2xl mb-4">
                  Quantity
                </h3>

                <div className="flex items-center gap-5">

                  <button
                    onClick={() =>
                      quantity > 1 &&
                      setQuantity(
                        quantity - 1
                      )
                    }
                    className="bg-red-500 text-white px-5 py-3 rounded-xl text-2xl"
                  >
                    −
                  </button>

                  <span className="text-3xl font-bold">
                    {quantity}
                  </span>

                  <button
                    onClick={() =>
                      setQuantity(
                        quantity + 1
                      )
                    }
                    className="bg-green-500 text-white px-5 py-3 rounded-xl text-2xl"
                  >
                    +
                  </button>

                </div>
              </div>

              {/* Buttons */}
              <div className="grid md:grid-cols-2 gap-5 mt-10">

                <button
                  onClick={handleAddToCart}
                  className="bg-black text-white py-5 rounded-2xl text-xl font-bold hover:bg-yellow-400 hover:text-black transition"
                >
                  Add to Cart
                </button>

                <button
                  onClick={handleBuyNow}
                  className="bg-yellow-400 py-5 rounded-2xl text-xl font-bold hover:scale-105 transition"
                >
                  Buy Now
                </button>

              </div>

            </div>
          </div>
        </div>
                {/* Reviews */}
        <div className="max-w-7xl mx-auto mt-16 bg-white p-8 rounded-[35px] shadow-lg">

          <h2 className="text-3xl font-bold mb-8">
            Customer Reviews
          </h2>

          {/* Write Review */}
          <div className="bg-gray-100 p-6 rounded-3xl mb-10">

            <h3 className="text-2xl font-bold mb-5">
              Write a Review
            </h3>

            <select
              value={rating}
              onChange={(e) =>
                setRating(
                  Number(
                    e.target.value
                  )
                )
              }
              className="w-full border p-4 rounded-2xl mb-4"
            >
              <option value={5}>
                ⭐⭐⭐⭐⭐ (5)
              </option>

              <option value={4}>
                ⭐⭐⭐⭐ (4)
              </option>

              <option value={3}>
                ⭐⭐⭐ (3)
              </option>

              <option value={2}>
                ⭐⭐ (2)
              </option>

              <option value={1}>
                ⭐ (1)
              </option>
            </select>

            <textarea
              placeholder="Write your review..."
              value={comment}
              onChange={(e) =>
                setComment(
                  e.target.value
                )
              }
              className="w-full border p-4 rounded-2xl h-32"
            />

            <button
              onClick={
                handleReviewSubmit
              }
              className="mt-5 bg-black text-white px-8 py-4 rounded-2xl font-bold hover:bg-yellow-400 hover:text-black transition"
            >
              Submit Review
            </button>

          </div>

          {/* Review List */}
          <div className="space-y-5">

            {reviews.length >
            0 ? (
              reviews.map(
                (
                  review
                ) => (
                  <div
                    key={
                      review.id
                    }
                    className="border rounded-3xl p-6 bg-gray-50"
                  >

                    <div className="flex justify-between items-center">

                      <div>
                        <h3 className="font-bold text-xl">
                          {
                            review.name
                          }
                        </h3>

                        <p className="text-yellow-500 text-lg">
                          {
                            "⭐".repeat(
                              review.rating
                            )
                          }
                        </p>
                      </div>

                      <span className="text-gray-500 text-sm">
                        {
                          review.date
                        }
                      </span>

                    </div>

                    <p className="text-gray-600 mt-4 leading-7">
                      {
                        review.comment
                      }
                    </p>

                  </div>
                )
              )
            ) : (
              <div className="text-center py-10">

                <h3 className="text-2xl font-bold text-gray-500">
                  No Reviews Yet 😢
                </h3>

                <p className="text-gray-400 mt-2">
                  Be the first one to review this product.
                </p>

              </div>
            )}

          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length >
        0 && (
          <div className="max-w-7xl mx-auto mt-16">

            <h2 className="text-4xl font-bold mb-8">
              Related Products
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

              {relatedProducts
                .slice(0, 4)
                .map(
                  (
                    item
                  ) => (
                    <div
                      key={
                        item.id
                      }
                      className="bg-white rounded-[30px] overflow-hidden shadow-lg hover:scale-105 transition"
                    >

                      <img
                        src={
                          item.image
                        }
                        alt={
                          item.name
                        }
                        className="h-64 w-full object-cover"
                      />

                      <div className="p-5">

                        <span className="bg-yellow-400 px-4 py-1 rounded-full text-sm font-bold">
                          {
                            item.category
                          }
                        </span>

                        <h3 className="text-2xl font-bold mt-3">
                          {
                            item.name
                          }
                        </h3>

                        <p className="text-green-600 text-2xl font-bold mt-2">
                          ₹
                          {
                            item.price
                          }
                        </p>

                        <Link
                          to={`/product/${item.id}`}
                        >
                          <button className="w-full mt-5 bg-black text-white py-3 rounded-2xl font-bold hover:bg-yellow-400 hover:text-black transition">
                            View Product
                          </button>
                        </Link>

                      </div>

                    </div>
                  )
                )}

            </div>
          </div>
        )}

      </div>

      <Footer />
    </>
  )
}

export default ProductDetails