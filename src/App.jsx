import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

// Pages
import Home from "./pages/Home"
import Products from "./pages/Products"
import ProductDetails from "./pages/ProductDetails"
import Cart from "./pages/Cart"
import Wishlist from "./pages/Wishlist"
import Checkout from "./pages/Checkout"
import Orders from "./pages/Orders"
import OrderSuccess from "./pages/OrderSuccess"

import About from "./pages/About"
import Contact from "./pages/Contact"

import Login from "./pages/Login"
import Signup from "./pages/Signup"

import Admin from "./pages/Admin"
import AdminLogin from "./pages/AdminLogin"

// Protected Routes
import ProtectedRoute from "./components/AdminRoute"
import AdminRoute from "./components/AdminRoute"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Main Pages */}
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/product/:id"
          element={
            <ProductDetails />
          }
        />

        {/* Shopping */}
        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/order-success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />

        {/* Info */}
        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        {/* Auth */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Admin */}
        <Route
          path="/admin-login"
          element={
            <AdminLogin />
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App