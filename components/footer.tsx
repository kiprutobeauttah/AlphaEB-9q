import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-brand-paleBlue">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="AlphaEb" width={40} height={40} />
              <span className="font-bold">AlphaEb</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your one-stop destination for digital reading. Discover, purchase, and enjoy eBooks across all genres.
            </p>
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="text-brand-blue hover:text-brand-mediumBlue hover:bg-brand-lightBlue/50"
              >
                <Link href="https://twitter.com">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="text-brand-blue hover:text-brand-mediumBlue hover:bg-brand-lightBlue/50"
              >
                <Link href="https://facebook.com">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="text-brand-blue hover:text-brand-mediumBlue hover:bg-brand-lightBlue/50"
              >
                <Link href="https://instagram.com">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-brand-blue">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-brand-blue">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/bestsellers" className="text-muted-foreground hover:text-brand-blue">
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link href="/new-releases" className="text-muted-foreground hover:text-brand-blue">
                  New Releases
                </Link>
              </li>
              <li>
                <Link href="/authors" className="text-muted-foreground hover:text-brand-blue">
                  Authors
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-brand-blue">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-brand-blue">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-brand-blue">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-brand-blue">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-brand-blue">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-muted-foreground hover:text-brand-blue">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-brand-blue">
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-brand-blue">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-brand-blue">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-brand-blue">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/copyright" className="text-muted-foreground hover:text-brand-blue">
                  Copyright Notice
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-brand-blue">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-brand-blue">Newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for the latest updates and promotions.
            </p>
            <form className="space-y-2">
              <Input type="email" placeholder="Your email" required />
              <Button type="submit" className="w-full bg-brand-blue hover:bg-brand-mediumBlue">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t border-brand-lightBlue pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} AlphaEb. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

