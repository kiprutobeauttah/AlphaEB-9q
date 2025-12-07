import { notFound } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Heart, Share2, BookOpen } from "lucide-react"
import DownloadForm from "@/components/download-form"

// Mock book data - in a real app, this would come from a database
const books = [
  {
    id: "1",
    title: "The Digital Mindset",
    author: "Alex Johnson",
    cover: "/placeholder.svg?height=600&width=400",
    price: 12.99,
    rating: 4.5,
    genre: "Business",
    description:
      "A comprehensive guide to developing a digital mindset in the modern world. Learn how to adapt to technological changes and thrive in the digital economy.",
    pages: 320,
    language: "English",
    publisher: "Tech Press",
    publishDate: "2023-03-15",
    isbn: "978-1234567890",
    format: "PDF, EPUB",
    fileSize: "4.2 MB",
  },
  {
    id: "2",
    title: "Coding Fundamentals",
    author: "Maria Garcia",
    cover: "/placeholder.svg?height=600&width=400",
    price: 9.99,
    rating: 4.8,
    genre: "Technology",
    description:
      "Start your coding journey with this beginner-friendly guide to programming fundamentals. Covers basic concepts, logic, and popular programming languages.",
    pages: 280,
    language: "English",
    publisher: "Code Academy Press",
    publishDate: "2023-01-10",
    isbn: "978-0987654321",
    format: "PDF, EPUB, MOBI",
    fileSize: "3.8 MB",
  },
  {
    id: "3",
    title: "The Art of Fiction",
    author: "James Wilson",
    cover: "/placeholder.svg?height=600&width=400",
    price: 7.99,
    rating: 4.2,
    genre: "Fiction",
    description:
      "A masterclass in fiction writing from award-winning author James Wilson. Learn techniques for creating compelling characters, plots, and settings.",
    pages: 240,
    language: "English",
    publisher: "Literary House",
    publishDate: "2022-11-05",
    isbn: "978-5678901234",
    format: "PDF, EPUB",
    fileSize: "2.9 MB",
  },
  {
    id: "4",
    title: "Financial Freedom",
    author: "Sarah Miller",
    cover: "/placeholder.svg?height=600&width=400",
    price: 14.99,
    rating: 4.7,
    genre: "Finance",
    description:
      "Take control of your financial future with practical advice on saving, investing, and building wealth. Includes actionable strategies for all income levels.",
    pages: 350,
    language: "English",
    publisher: "Money Matters",
    publishDate: "2023-02-20",
    isbn: "978-6789012345",
    format: "PDF, EPUB, MOBI",
    fileSize: "5.1 MB",
  },
  {
    id: "5",
    title: "Modern Web Development",
    author: "David Chen",
    cover: "/placeholder.svg?height=600&width=400",
    price: 19.99,
    rating: 4.9,
    genre: "Technology",
    description:
      "Master modern web development with this comprehensive guide covering HTML, CSS, JavaScript, and popular frameworks like React, Vue, and Angular.",
    pages: 420,
    language: "English",
    publisher: "Web Dev Press",
    publishDate: "2023-04-12",
    isbn: "978-2345678901",
    format: "PDF, EPUB",
    fileSize: "6.3 MB",
  },
  {
    id: "6",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    cover: "/placeholder.svg?height=600&width=400",
    price: 11.99,
    rating: 4.8,
    genre: "Finance",
    description:
      "Explore the complex relationship between money and human behavior. This book delves into the psychological aspects of financial decisions and how they shape our lives.",
    pages: 256,
    language: "English",
    publisher: "Finance Insights",
    publishDate: "2023-01-25",
    isbn: "978-3456789012",
    format: "PDF, EPUB, MOBI",
    fileSize: "3.5 MB",
  },
  {
    id: "7",
    title: "Data Science Essentials",
    author: "Emily Zhang",
    cover: "/placeholder.svg?height=600&width=400",
    price: 15.99,
    rating: 4.6,
    genre: "Technology",
    description:
      "An essential guide to data science concepts, tools, and methodologies. Learn how to collect, analyze, and interpret data to drive business decisions.",
    pages: 380,
    language: "English",
    publisher: "Data Press",
    publishDate: "2023-03-08",
    isbn: "978-4567890123",
    format: "PDF, EPUB",
    fileSize: "5.7 MB",
  },
  {
    id: "8",
    title: "The Startup Way",
    author: "Eric Ries",
    cover: "/placeholder.svg?height=600&width=400",
    price: 13.99,
    rating: 4.7,
    genre: "Business",
    description:
      "Learn how to apply entrepreneurial principles to established companies. This book provides a framework for innovation and growth in any organizational context.",
    pages: 310,
    language: "English",
    publisher: "Startup Press",
    publishDate: "2022-12-15",
    isbn: "978-5678901234",
    format: "PDF, EPUB, MOBI",
    fileSize: "4.8 MB",
  },
]

export default function BookPage({ params }: { params: { id: string } }) {
  const book = books.find((b) => b.id === params.id)

  if (!book) {
    notFound()
  }

  return (
    <div className="container py-8 px-4 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div className="flex justify-center">
          <div className="relative w-full max-w-md aspect-[3/4]">
            <Image
              src={book.cover || "/placeholder.svg"}
              alt={book.title}
              fill
              className="object-cover rounded-lg shadow-lg"
              priority
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Badge className="mb-2">{book.genre}</Badge>
            <h1 className="text-3xl font-bold">{book.title}</h1>
            <p className="text-lg text-muted-foreground">by {book.author}</p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-xl ${i < Math.floor(book.rating) ? "text-yellow-500" : "text-gray-300"}`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-muted-foreground">({book.rating})</span>
          </div>

          <div className="text-2xl font-bold">${book.price.toFixed(2)}</div>

          <div className="flex flex-wrap gap-3">
            <Button className="flex-1">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          <Separator />

          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground">{book.description}</p>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium">Format</h3>
              <p className="text-muted-foreground">{book.format}</p>
            </div>
            <div>
              <h3 className="font-medium">Pages</h3>
              <p className="text-muted-foreground">{book.pages}</p>
            </div>
            <div>
              <h3 className="font-medium">File Size</h3>
              <p className="text-muted-foreground">{book.fileSize}</p>
            </div>
            <div>
              <h3 className="font-medium">Language</h3>
              <p className="text-muted-foreground">{book.language}</p>
            </div>
            <div>
              <h3 className="font-medium">Publisher</h3>
              <p className="text-muted-foreground">{book.publisher}</p>
            </div>
            <div>
              <h3 className="font-medium">Publication Date</h3>
              <p className="text-muted-foreground">{book.publishDate}</p>
            </div>
            <div>
              <h3 className="font-medium">ISBN</h3>
              <p className="text-muted-foreground">{book.isbn}</p>
            </div>
          </div>

          <div className="pt-4">
            <Button variant="outline" className="w-full">
              <BookOpen className="mr-2 h-4 w-4" />
              Preview Sample
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Download this eBook</h2>
        <DownloadForm bookId={book.id} bookTitle={book.title} />
      </div>
    </div>
  )
}
