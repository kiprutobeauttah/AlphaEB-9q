"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock data for featured books
const featuredBooks = [
  {
    id: 1,
    title: "The Digital Mindset",
    author: "Alex Johnson",
    cover: "/placeholder.svg?height=400&width=300",
    price: 12.99,
    rating: 4.5,
    genre: "Business",
    featured: true,
  },
  {
    id: 2,
    title: "Coding Fundamentals",
    author: "Maria Garcia",
    cover: "/placeholder.svg?height=400&width=300",
    price: 9.99,
    rating: 4.8,
    genre: "Technology",
    featured: true,
  },
  {
    id: 3,
    title: "The Art of Fiction",
    author: "James Wilson",
    cover: "/placeholder.svg?height=400&width=300",
    price: 7.99,
    rating: 4.2,
    genre: "Fiction",
    featured: true,
  },
  {
    id: 4,
    title: "Financial Freedom",
    author: "Sarah Miller",
    cover: "/placeholder.svg?height=400&width=300",
    price: 14.99,
    rating: 4.7,
    genre: "Finance",
    featured: true,
  },
]

export default function FeaturedBooks() {
  const [wishlist, setWishlist] = useState<number[]>([])

  const toggleWishlist = (id: number) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((bookId) => bookId !== id))
    } else {
      setWishlist([...wishlist, id])
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-6">
      {featuredBooks.map((book) => (
        <Card key={book.id} className="overflow-hidden transition-all hover:shadow-lg">
          <div className="relative">
            <Link href={`/books/${book.id}`}>
              <Image
                src={book.cover || "/placeholder.svg"}
                alt={book.title}
                width={300}
                height={400}
                className="w-full object-cover aspect-[3/4]"
              />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full"
              onClick={() => toggleWishlist(book.id)}
            >
              <Heart className={`h-5 w-5 ${wishlist.includes(book.id) ? "fill-red-500 text-red-500" : ""}`} />
              <span className="sr-only">Add to wishlist</span>
            </Button>
          </div>
          <CardContent className="p-4">
            <Badge className="mb-2">{book.genre}</Badge>
            <h3 className="font-semibold text-lg line-clamp-1">{book.title}</h3>
            <p className="text-sm text-muted-foreground">by {book.author}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="font-bold">${book.price.toFixed(2)}</span>
              <div className="flex items-center">
                <span className="text-yellow-500">★</span>
                <span className="text-sm ml-1">{book.rating}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex gap-2">
            <Button variant="default" className="w-full" size="sm">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <Button variant="outline" size="icon" className="shrink-0">
              <Eye className="h-4 w-4" />
              <span className="sr-only">Preview</span>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

