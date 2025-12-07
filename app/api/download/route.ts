import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

// In a real app, this would be stored in a database
const downloadCodes = new Map<
  string,
  {
    email: string
    bookId: string
    used: boolean
    expiresAt: Date
  }
>()

export async function POST(request: NextRequest) {
  try {
    const { email, bookId } = await request.json()

    if (!email || !bookId) {
      return NextResponse.json({ error: "Email and book ID are required" }, { status: 400 })
    }

    // Generate a unique download code
    const downloadCode = crypto.randomBytes(6).toString("hex")

    // Store the download code with expiration (24 hours)
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 24)

    downloadCodes.set(downloadCode, {
      email,
      bookId,
      used: false,
      expiresAt,
    })

    // In a real app, you would send an email with the download code
    // For now, we'll just return it in the response

    return NextResponse.json({
      success: true,
      message: "Download code generated successfully",
      downloadCode,
    })
  } catch (error) {
    console.error("Error generating download code:", error)
    return NextResponse.json({ error: "Failed to generate download code" }, { status: 500 })
  }
}

// Handle GET requests when someone tries to visit the route directly
export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      message:
        "This is an API endpoint and not a page. It should be called with a POST request from your application code.",
      usage: "Make a POST request to this endpoint with email and bookId to generate a download code.",
    },
    { status: 400 },
  )
}
