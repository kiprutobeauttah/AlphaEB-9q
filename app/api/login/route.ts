import { type NextRequest, NextResponse } from "next/server"
import { login } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ message: "Username and password are required" }, { status: 400 })
    }

    const result = await login(username, password)

    if (!result.success) {
      return NextResponse.json({ message: result.message }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      user: result.user,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "An error occurred during login" }, { status: 500 })
  }
}

// Handle GET requests when someone tries to visit the route directly
export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      message:
        "This is an API endpoint and not a page. It should be called with a POST request from your application code.",
      usage: "Make a POST request to this endpoint with username and password to log in.",
    },
    { status: 400 },
  )
}
