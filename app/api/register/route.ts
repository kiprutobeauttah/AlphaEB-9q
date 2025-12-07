import { type NextRequest, NextResponse } from "next/server"
import { register } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Name, email, and password are required" }, { status: 400 })
    }

    // In a real app, you would send an email to the admin
    // For demo purposes, we'll simulate this
    console.log(`New registration request: ${name} (${email})`)

    // Send email to admin (simulated)
    const adminEmail = "admin@example.com"
    console.log(`Sending notification to admin at ${adminEmail}`)
    console.log(`Subject: New User Registration`)
    console.log(`Body: A new user has registered:
      Name: ${name}
      Email: ${email}
      Please add this user to the system.`)

    const result = await register(email, password, name)

    if (!result.success) {
      return NextResponse.json({ message: result.message }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      user: result.user,
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "An error occurred during registration" }, { status: 500 })
  }
}

// Handle GET requests when someone tries to visit the route directly
export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      message:
        "This is an API endpoint and not a page. It should be called with a POST request from your application code.",
      usage: "Make a POST request to this endpoint with name, email, and password to register a new user.",
    },
    { status: 400 },
  )
}
