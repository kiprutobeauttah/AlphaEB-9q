import { type NextRequest, NextResponse } from "next/server"
import { logout } from "@/lib/auth"

// Handle POST requests for actual logout functionality
export async function POST(request: NextRequest) {
  try {
    await logout()

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ message: "An error occurred during logout" }, { status: 500 })
  }
}

// Handle GET requests when someone tries to visit the route directly
export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      message:
        "This is an API endpoint and not a page. It should be called with a POST request from your application code.",
      usage: "Make a POST request to this endpoint to log out a user.",
    },
    { status: 400 },
  )
}

