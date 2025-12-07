"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock data for new arrivals
const newArrivals = [
  {
    id: 9,
    title: "Artificial Intelligence: A Modern Approach",
    author: "Stuart Russell & Peter Norvig",
    cover: "/placeholder.svg?height=400&width=300",
    price: 24.99,
    rating: 4.9,
    genre: "Technology",
    newArrival: true,
  },
  {
    id: 10,
    title: "The Lean Startup",
    author: "Eric Ries",
    cover: "/placeholder.svg?height=400&width=300",
    price: 10.99,
    rating: 4.7,
    genre: "Business",
    newArrival: true,
  },
  {
    id: 11,
    title: "Clean Code",
    author: "Robert C. Martin",
    cover: "/placeholder.svg?height=400&width=300",
    price: 18.99,
    rating: 4.8,
    genre: "Technology",
    newArrival: true,
  },
  {
    id: 12,
    title: "Deep Work",
    author: "Cal Newport",
    cover: "/placeholder.svg?height=400&width=300",
    price: 12.99,
    rating: 4.6,
    genre: "Productivity",
    newArrival: true,
  },
]

export default function NewArrivals() {
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
      {newArrivals.map((book) => (
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
            <Badge variant="destructive" className="absolute top-2 left-2">
              New
            </Badge>
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
