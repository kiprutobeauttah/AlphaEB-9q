import { type NextRequest, NextResponse } from "next/server"

// In a real app, this would be stored in a database
// This is just a mock for demonstration
const downloadCodes = new Map<
  string,
  {
    email: string
    bookId: string
    used: boolean
    expiresAt: Date
  }
>()

// Mock book data
const books = {
  "1": { title: "The Digital Mindset", filePath: "/books/digital-mindset.pdf" },
  "2": { title: "Coding Fundamentals", filePath: "/books/coding-fundamentals.pdf" },
  "3": { title: "The Art of Fiction", filePath: "/books/art-of-fiction.pdf" },
  "4": { title: "Financial Freedom", filePath: "/books/financial-freedom.pdf" },
}

export async function POST(request: NextRequest) {
  try {
    const { downloadCode, email } = await request.json()

    if (!downloadCode || !email) {
      return NextResponse.json({ error: "Download code and email are required" }, { status: 400 })
    }

    const downloadInfo = downloadCodes.get(downloadCode)

    if (!downloadInfo) {
      return NextResponse.json({ error: "Invalid download code" }, { status: 400 })
    }

    if (downloadInfo.email !== email) {
      return NextResponse.json({ error: "Email does not match the download code" }, { status: 400 })
    }

    if (downloadInfo.used) {
      return NextResponse.json({ error: "Download code has already been used" }, { status: 400 })
    }

    const now = new Date()
    if (now > downloadInfo.expiresAt) {
      return NextResponse.json({ error: "Download code has expired" }, { status: 400 })
    }

    // Mark the code as used
    downloadInfo.used = true
    downloadCodes.set(downloadCode, downloadInfo)

    // In a real app, you would generate a signed URL or token for the actual download
    const book = books[downloadInfo.bookId as keyof typeof books]

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Download code verified successfully",
      downloadUrl: `/api/download-file?bookId=${downloadInfo.bookId}&token=some-secure-token`,
      bookTitle: book.title,
    })
  } catch (error) {
    console.error("Error verifying download code:", error)
    return NextResponse.json({ error: "Failed to verify download code" }, { status: 500 })
  }
}

// Handle GET requests when someone tries to visit the route directly
export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      message:
        "This is an API endpoint and not a page. It should be called with a POST request from your application code.",
      usage: "Make a POST request to this endpoint with downloadCode and email to verify a download code.",
    },
    { status: 400 },
  )
}

