import {
  createContext,
  useEffect,
  useState,
} from "react"

export const AuthContext =
  createContext()

function AuthProvider({
  children,
}) {
  const [user, setUser] =
    useState(() => {
      const savedUser =
        localStorage.getItem(
          "loggedInUser"
        )

      return savedUser
        ? JSON.parse(
            savedUser
          )
        : null
    })

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(user)
      )
    } else {
      localStorage.removeItem(
        "loggedInUser"
      )
    }
  }, [user])

  // SIGNUP
  const signup = (
    name,
    email,
    password
  ) => {
    const users =
      JSON.parse(
        localStorage.getItem(
          "users"
        )
      ) || []

    const cleanEmail =
      email
        .trim()
        .toLowerCase()

    const existingUser =
      users.find(
        (u) =>
          u.email ===
          cleanEmail
      )

    if (existingUser) {
      return {
        success: false,
        message:
          "User already exists",
      }
    }

    const newUser = {
      id: Date.now(),
      name:
        name.trim(),
      email:
        cleanEmail,
      password:
        password.trim(),
    }

    const updatedUsers =
      [
        ...users,
        newUser,
      ]

    localStorage.setItem(
      "users",
      JSON.stringify(
        updatedUsers
      )
    )

    return {
      success: true,
      message:
        "Account Created Successfully ✅",
    }
  }

  // LOGIN
  const login = (
    email,
    password
  ) => {
    const users =
      JSON.parse(
        localStorage.getItem(
          "users"
        )
      ) || []

    const cleanEmail =
      email
        .trim()
        .toLowerCase()

    const foundUser =
      users.find(
        (u) =>
          u.email ===
            cleanEmail &&
          u.password ===
            password.trim()
      )

    if (!foundUser) {
      return {
        success: false,
        message:
          "Invalid Email or Password ❌",
      }
    }

    setUser(
      foundUser
    )

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(
        foundUser
      )
    )

    return {
      success: true,
      message:
        "Login Successful ✅",
    }
  }

  // LOGOUT
  const logout = () => {
    setUser(null)

    localStorage.removeItem(
      "loggedInUser"
    )
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider