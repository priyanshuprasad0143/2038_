import {
  useState,
  useEffect,
} from "react"

import {
  Navigate,
} from "react-router-dom"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function Admin() {
  const isAdmin =
    localStorage.getItem(
      "isAdmin"
    )

  const defaultProducts = [
    {
      id: 1,
      name: "Ghee Baati",
      category: "Food",
      price: 199,
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800",
      description:
        "Traditional Ghee Baati with premium ingredients.",
    },

    {
      id: 2,
      name: "Strom Mango",
      category: "Drink",
      price: 49,
      image:
        "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=800",
      description:
        "Refreshing mango flavored Strom drink.",
    },

    {
      id: 3,
      name: "Strom Cola",
      category: "Drink",
      price: 49,
      image:
        "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=800",
      description:
        "Classic cola Strom cold drink.",
    },

    {
      id: 4,
      name: "Strom Orange",
      category: "Drink",
      price: 49,
      image:
        "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800",
      description:
        "Fresh orange Strom flavor.",
    },

    {
      id: 5,
      name:
        "Bite Me Chocolate",
      category:
        "Chocolate",
      price: 99,
      image:
        "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800",
      description:
        "Premium handmade Bite Me chocolate.",
    },

    {
      id: 6,
      name:
        "Spiral Potato",
      category:
        "Snacks",
      price: 79,
      image:
        "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=800",
      description:
        "Crispy Spiral Potato snack.",
    },
  ]

  const [products,
    setProducts] =
    useState([])

  const [orders,
    setOrders] =
    useState([])

  const [editingId,
    setEditingId] =
    useState(null)

  const [formData,
    setFormData] =
    useState({
      name: "",
      category: "",
      price: "",
      image: "",
      description: "",
    })

  useEffect(() => {
    const savedProducts =
      JSON.parse(
        localStorage.getItem(
          "adminProducts"
        )
      )

    if (
      !savedProducts ||
      savedProducts.length ===
        0
    ) {
      localStorage.setItem(
        "adminProducts",
        JSON.stringify(
          defaultProducts
        )
      )

      setProducts(
        defaultProducts
      )
    } else {
      setProducts(
        savedProducts
      )
    }

    const savedOrders =
      JSON.parse(
        localStorage.getItem(
          "orders"
        )
      ) || []

    setOrders(
      savedOrders
    )
  }, [])

  if (!isAdmin) {
    return (
      <Navigate to="/admin-login" />
    )
  }

  const handleChange = (
    e
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    })
  }

  const handleImageUpload =
    (e) => {
      const file =
        e.target.files[0]

      if (!file)
        return

      const reader =
        new FileReader()

      reader.onloadend =
        () => {
          setFormData(
            (prev) => ({
              ...prev,
              image:
                reader.result,
            })
          )
        }

      reader.readAsDataURL(
        file
      )
    }

  const handleSubmit =
    (e) => {
      e.preventDefault()

      let updatedProducts

      if (
        editingId
      ) {
        updatedProducts =
          products.map(
            (
              product
            ) =>
              product.id ===
              editingId
                ? {
                    ...product,
                    ...formData,
                    price:
                      Number(
                        formData.price
                      ),
                  }
                : product
          )
      } else {
        const newProduct =
          {
            id:
              Date.now(),
            ...formData,
            price:
              Number(
                formData.price
              ),
          }

        updatedProducts =
          [
            ...products,
            newProduct,
          ]
      }

      setProducts(
        updatedProducts
      )

      localStorage.setItem(
        "adminProducts",
        JSON.stringify(
          updatedProducts
        )
      )

      setEditingId(
        null
      )

      setFormData({
        name: "",
        category: "",
        price: "",
        image: "",
        description:
          "",
      })

      alert(
        editingId
          ? "Updated ✅"
          : "Added ✅"
      )
    }

  const editProduct =
    (product) => {
      setEditingId(
        product.id
      )

      setFormData(
        product
      )

      window.scrollTo({
        top: 0,
        behavior:
          "smooth",
      })
    }

  const deleteProduct =
    (id) => {
      const updated =
        products.filter(
          (p) =>
            p.id !==
            id
        )

      setProducts(
        updated
      )

      localStorage.setItem(
        "adminProducts",
        JSON.stringify(
          updated
        )
      )
    }

  const updateOrderStatus =
    (
      orderId,
      newStatus
    ) => {
      const updatedOrders =
        orders.map(
          (order) =>
            order.orderId ===
            orderId
              ? {
                  ...order,
                  status:
                    newStatus,
                }
              : order
        )

      setOrders(
        updatedOrders
      )

      localStorage.setItem(
        "orders",
        JSON.stringify(
          updatedOrders
        )
      )
    }

  const deleteOrder =
    (orderId) => {
      const updatedOrders =
        orders.filter(
          (order) =>
            order.orderId !==
            orderId
        )

      setOrders(
        updatedOrders
      )

      localStorage.setItem(
        "orders",
        JSON.stringify(
          updatedOrders
        )
      )
    }
      return (
    <>
      <Navbar />

      <div className="bg-gray-100 min-h-screen p-8">
        <h1 className="text-5xl font-bold text-center mb-10">
          Admin Panel
        </h1>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Form */}
          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <h2 className="text-3xl font-bold mb-6">
              {editingId
                ? "Edit Product"
                : "Add Product"}
            </h2>

            <form
              onSubmit={
                handleSubmit
              }
              className="space-y-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={
                  formData.name
                }
                onChange={
                  handleChange
                }
                className="w-full border p-4 rounded-xl"
                required
              />

              <input
                type="text"
                name="category"
                placeholder="Category"
                value={
                  formData.category
                }
                onChange={
                  handleChange
                }
                className="w-full border p-4 rounded-xl"
                required
              />

              <input
                type="number"
                name="price"
                placeholder="Price"
                value={
                  formData.price
                }
                onChange={
                  handleChange
                }
                className="w-full border p-4 rounded-xl"
                required
              />

              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={
                  formData.image?.startsWith(
                    "data:"
                  )
                    ? ""
                    : formData.image
                }
                onChange={
                  handleChange
                }
                className="w-full border p-4 rounded-xl"
              />

              <input
                type="file"
                accept="image/*"
                onChange={
                  handleImageUpload
                }
                className="w-full border p-4 rounded-xl"
              />

              <textarea
                name="description"
                placeholder="Description"
                value={
                  formData.description
                }
                onChange={
                  handleChange
                }
                className="w-full border p-4 rounded-xl h-32"
              />

              <button className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-yellow-400 hover:text-black transition">
                {editingId
                  ? "Save Changes"
                  : "Add Product"}
              </button>
            </form>
          </div>

          {/* Product List */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold mb-4">
              Products
            </h2>

            {products.map(
              (
                product
              ) => (
                <div
                  key={
                    product.id
                  }
                  className="bg-white p-4 rounded-2xl shadow flex justify-between items-center"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        product.image
                      }
                      alt={
                        product.name
                      }
                      className="w-20 h-20 object-cover rounded-xl"
                    />

                    <div>
                      <h2 className="font-bold text-xl">
                        {
                          product.name
                        }
                      </h2>

                      <p className="text-gray-500">
                        {
                          product.category
                        }
                      </p>

                      <p className="text-green-600 font-bold">
                        ₹
                        {
                          product.price
                        }
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        editProduct(
                          product
                        )
                      }
                      className="bg-blue-500 text-white px-5 py-2 rounded-xl"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteProduct(
                          product.id
                        )
                      }
                      className="bg-red-500 text-white px-5 py-2 rounded-xl"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Orders */}
        <div className="mt-16">
          <h2 className="text-4xl font-bold mb-6">
            Customer Orders
          </h2>

          {orders.length >
          0 ? (
            <div className="space-y-5">
              {orders.map(
                (
                  order
                ) => (
                  <div
                    key={
                      order.orderId
                    }
                    className="bg-white p-6 rounded-3xl shadow-lg"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-2xl font-bold">
                          {
                            order.orderId
                          }
                        </h3>

                        <p className="text-gray-500">
                          {
                            order.orderDate
                          }
                        </p>
                      </div>

                      <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-bold">
                        {
                          order.status
                        }
                      </span>
                    </div>

                    <div className="space-y-2">
                      <p>
                        <strong>
                          Name:
                        </strong>{" "}
                        {
                          order
                            .address
                            .fullName
                        }
                      </p>

                      <p>
                        <strong>
                          Phone:
                        </strong>{" "}
                        {
                          order
                            .address
                            .phone
                        }
                      </p>

                      <p>
                        <strong>
                          Address:
                        </strong>{" "}
                        {
                          order
                            .address
                            .address
                        }
                        ,{" "}
                        {
                          order
                            .address
                            .city
                        }{" "}
                        -
                        {" "}
                        {
                          order
                            .address
                            .pincode
                        }
                      </p>

                      <p>
                        <strong>
                          Payment:
                        </strong>{" "}
                        {
                          order.paymentMethod
                        }
                      </p>

                      <p>
                        <strong>
                          Total:
                        </strong>{" "}
                        ₹
                        {
                          order.totalPrice
                        }
                      </p>
                    </div>

                    <div className="mt-5 flex gap-3">
                      <button
                        onClick={() =>
                          updateOrderStatus(
                            order.orderId,
                            "Delivered"
                          )
                        }
                        className="bg-green-500 text-white px-5 py-2 rounded-xl"
                      >
                        Delivered
                      </button>

                      <button
                        onClick={() =>
                          deleteOrder(
                            order.orderId
                          )
                        }
                        className="bg-red-500 text-white px-5 py-2 rounded-xl"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          ) : (
            <p className="text-gray-500 text-xl">
              No Orders Yet
            </p>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Admin