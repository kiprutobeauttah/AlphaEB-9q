// This is a simplified auth implementation for demonstration
// In a real app, you would use a proper auth solution like NextAuth.js or Clerk

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import crypto from "crypto"

// In a real app, this would be stored in a database
export const users = new Map<
  string,
  {
    id: string
    email: string
    password: string
    name: string
    role: "user" | "admin"
  }
>()

// Initialize with admin user
users.set("Beauttah", {
  id: "admin-1",
  email: "admin@example.com",
  password: "Kipruto", // In a real app, this would be hashed
  name: "Admin User",
  role: "admin",
})

export async function login(username: string, password: string) {
  const user = users.get(username)

  if (!user || user.password !== password) {
    return { success: false, message: "Invalid username or password" }
  }

  // Generate a session token
  const sessionToken = crypto.randomBytes(32).toString("hex")

  // In a real app, you would store this in a database with an expiry
  // For demo purposes, we'll store it in a cookie
  cookies().set("session_token", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  cookies().set("user_role", user.role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  return { success: true, user: { id: user.id, email: user.email, name: user.name, role: user.role } }
}

export async function logout() {
  cookies().delete("session_token")
  cookies().delete("user_role")
}

export async function register(email: string, password: string, name: string) {
  // Check if email is already registered
  const existingUser = Array.from(users.values()).find((user) => user.email === email)

  if (existingUser) {
    return { success: false, message: "Email already registered" }
  }

  const userId = crypto.randomBytes(16).toString("hex")
  const username = email.split("@")[0] + "-" + crypto.randomBytes(2).toString("hex")

  users.set(username, {
    id: userId,
    email,
    password, // In a real app, this would be hashed
    name,
    role: "user",
  })

  // In a real app, you would send an email to the admin
  // For demo purposes, we'll just log it
  console.log(`New user registered: ${name} (${email}) with username: ${username}`)

  // Automatically log in the new user
  return login(username, password)
}

export async function getCurrentUser() {
  // In a real app, you would verify the session token
  // For demo purposes, we'll just check if it exists
  const sessionToken = cookies().get("session_token")

  if (!sessionToken) {
    return null
  }

  const userRole = cookies().get("user_role")?.value

  // In a real app, you would look up the user by session token
  // For demo purposes, we'll just return a mock user
  return {
    id: "user-1",
    name: "Current User",
    email: "user@example.com",
    role: userRole || "user",
  }
}

export async function requireAuth() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return user
}

export async function requireAdmin() {
  const user = await getCurrentUser()

  if (!user || user.role !== "admin") {
    redirect("/login?error=unauthorized")
  }

  return user
}
