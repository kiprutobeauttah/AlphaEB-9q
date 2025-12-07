"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Download, Heart, LogOut, ShoppingCart } from "lucide-react"
import Link from "next/link"

interface Purchase {
  id: string
  bookId: string
  title: string
  author: string
  cover: string
  purchaseDate: string
  price: number
  downloadCode?: string
}

interface WishlistItem {
  id: string
  bookId: string
  title: string
  author: string
  cover: string
  price: number
}

interface UserDashboardProps {
  user: {
    id: string
    name: string
    email: string
    role: string
  }
}

export default function UserDashboard({ user }: UserDashboardProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("purchases")

  // Mock data - in a real app, this would come from an API
  const [purchases, setPurchases] = useState<Purchase[]>([
    {
      id: "purchase-1",
      bookId: "1",
      title: "The Digital Mindset",
      author: "Alex Johnson",
      cover: "/placeholder.svg?height=120&width=80",
      purchaseDate: "2023-05-15",
      price: 12.99,
      downloadCode: "DM123456",
    },
    {
      id: "purchase-2",
      bookId: "3",
      title: "The Art of Fiction",
      author: "James Wilson",
      cover: "/placeholder.svg?height=120&width=80",
      purchaseDate: "2023-04-22",
      price: 7.99,
    },
  ])

  const [wishlist, setWishlist] = useState<WishlistItem[]>([
    {
      id: "wishlist-1",
      bookId: "2",
      title: "Coding Fundamentals",
      author: "Maria Garcia",
      cover: "/placeholder.svg?height=120&width=80",
      price: 9.99,
    },
    {
      id: "wishlist-2",
      bookId: "4",
      title: "Financial Freedom",
      author: "Sarah Miller",
      cover: "/placeholder.svg?height=120&width=80",
      price: 14.99,
    },
  ])

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" })
      router.push("/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const handleRemoveFromWishlist = (id: string) => {
    setWishlist(wishlist.filter((item) => item.id !== id))
  }

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="purchases">
            <ShoppingCart className="mr-2 h-4 w-4" />
            My Purchases
          </TabsTrigger>
          <TabsTrigger value="wishlist">
            <Heart className="mr-2 h-4 w-4" />
            My Wishlist
          </TabsTrigger>
        </TabsList>

        <TabsContent value="purchases">
          <Card>
            <CardHeader>
              <CardTitle>My eBook Purchases</CardTitle>
              <CardDescription>View and download your purchased eBooks</CardDescription>
            </CardHeader>
            <CardContent>
              {purchases.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No purchases yet</h3>
                  <p className="mt-1 text-muted-foreground">Browse our collection and find your first eBook</p>
                  <Button className="mt-4" asChild>
                    <Link href="/">Browse eBooks</Link>
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Book</TableHead>
                      <TableHead>Purchase Date</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {purchases.map((purchase) => (
                      <TableRow key={purchase.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Image
                              src={purchase.cover || "/placeholder.svg"}
                              alt={purchase.title}
                              width={50}
                              height={75}
                              className="rounded-sm"
                            />
                            <div>
                              <div className="font-medium">{purchase.title}</div>
                              <div className="text-sm text-muted-foreground">{purchase.author}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{purchase.purchaseDate}</TableCell>
                        <TableCell>${purchase.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant={purchase.downloadCode ? "outline" : "default"}>
                            {purchase.downloadCode ? "Downloaded" : "Ready to Download"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant={purchase.downloadCode ? "outline" : "default"} size="sm" asChild>
                            <Link href={`/books/${purchase.bookId}`}>
                              <Download className="mr-2 h-4 w-4" />
                              {purchase.downloadCode ? "Download Again" : "Download"}
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wishlist">
          <Card>
            <CardHeader>
              <CardTitle>My Wishlist</CardTitle>
              <CardDescription>Books you've saved for later</CardDescription>
            </CardHeader>
            <CardContent>
              {wishlist.length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Your wishlist is empty</h3>
                  <p className="mt-1 text-muted-foreground">Save books you're interested in for later</p>
                  <Button className="mt-4" asChild>
                    <Link href="/">Browse eBooks</Link>
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {wishlist.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <Image
                            src={item.cover || "/placeholder.svg"}
                            alt={item.title}
                            width={80}
                            height={120}
                            className="rounded-sm"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.author}</p>
                            <p className="mt-2 font-bold">${item.price.toFixed(2)}</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex justify-between">
                        <Button variant="outline" size="sm" onClick={() => handleRemoveFromWishlist(item.id)}>
                          Remove
                        </Button>
                        <Button size="sm" asChild>
                          <Link href={`/books/${item.bookId}`}>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Buy Now
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

