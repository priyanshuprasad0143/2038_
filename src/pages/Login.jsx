import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { AuthContext } from "../context/AuthContext"

function Login() {
  const navigate = useNavigate()

  const { login } =
    useContext(AuthContext)

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const handleLogin = (e) => {
    e.preventDefault()

    const result = login(
      email,
      password
    )

    alert(result.message)

    if (result.success) {
      navigate("/")
    }
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-12">
        <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-center">
            Login
          </h1>

          <p className="text-center text-gray-500 mt-2">
            Welcome back to 2038
          </p>

          <form
            onSubmit={handleLogin}
            className="mt-8 space-y-5"
          >
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

            <button className="w-full bg-black text-white py-4 rounded-2xl text-lg font-bold">
              Login
            </button>
          </form>

          <p className="text-center mt-6">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-yellow-500 font-bold"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Login