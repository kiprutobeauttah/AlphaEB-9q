import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookX } from "lucide-react"

export default function BookNotFound() {
  return (
    <div className="container flex flex-col items-center justify-center py-20 text-center">
      <BookX className="h-24 w-24 text-muted-foreground mb-6" />
      <h1 className="text-3xl font-bold mb-2">Book Not Found</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        Sorry, we couldn't find the book you're looking for. It may have been removed or the URL might be incorrect.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/">Browse Books</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/contact">Contact Support</Link>
        </Button>
      </div>
    </div>
  )
}
