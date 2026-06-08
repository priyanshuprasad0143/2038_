import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function AdminLogin() {
  const navigate =
    useNavigate()

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const handleLogin = (e) => {
    e.preventDefault()

    if (
      email ===
        "admin@2038.com" &&
      password === "admin123"
    ) {
      localStorage.setItem(
        "isAdmin",
        "true"
      )

      alert(
        "Admin Login Successful ✅"
      )

      navigate("/admin")
    } else {
      alert(
        "Invalid Admin Credentials ❌"
      )
    }
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
        <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">
          <h1 className="text-4xl font-bold text-center mb-8">
            Admin Login
          </h1>

          <form
            onSubmit={
              handleLogin
            }
            className="space-y-5"
          >
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="w-full border p-4 rounded-2xl"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="w-full border p-4 rounded-2xl"
              required
            />

            <button className="w-full bg-black text-white py-4 rounded-2xl font-bold text-lg">
              Login as Admin
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default AdminLogin