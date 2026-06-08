import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { AuthContext } from "../context/AuthContext"

function Signup() {
  const navigate = useNavigate()

  const { signup } =
    useContext(AuthContext)

  const [name, setName] =
    useState("")

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const handleSignup = (e) => {
    e.preventDefault()

    const result = signup(
      name,
      email,
      password
    )

    alert(result.message)

    if (result.success) {
      navigate("/login")
    }
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-12">
        <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-center">
            Signup
          </h1>

          <p className="text-center text-gray-500 mt-2">
            Create your 2038 account
          </p>

          <form
            onSubmit={handleSignup}
            className="mt-8 space-y-5"
          >
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full border p-4 rounded-2xl"
              required
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full border p-4 rounded-2xl"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full border p-4 rounded-2xl"
              required
            />

            <button className="w-full bg-yellow-400 text-black py-4 rounded-2xl text-lg font-bold">
              Create Account
            </button>
          </form>

          <p className="text-center mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-yellow-500 font-bold"
            >
              Login
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Signup