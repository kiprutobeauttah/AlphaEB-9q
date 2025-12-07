import FeaturedBooks from "@/components/featured-books"
import NewArrivals from "@/components/new-arrivals"
import TrendingBooks from "@/components/trending-books"
import SearchBar from "@/components/search-bar"
import { Button } from "@/components/ui/button"
import { BookOpen, TrendingUp, Sparkles } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-brand-blue via-brand-mediumBlue to-brand-lightBlue text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Discover Your Next Favorite eBook
                  </h1>
                  <p className="max-w-[600px] text-brand-paleBlue md:text-xl">
                    Thousands of titles across all genres. Start reading instantly on any device.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-white text-brand-blue hover:bg-brand-paleBlue">
                    Browse Categories
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Become an Author
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="bg-white/90 p-4 rounded-lg w-full max-w-md">
                  <SearchBar />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Books Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-brand-blue" />
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Featured Books</h2>
              </div>
              <Button
                variant="ghost"
                className="gap-1 text-brand-blue hover:text-brand-mediumBlue hover:bg-brand-paleBlue"
              >
                View All <span className="sr-only">featured books</span>
              </Button>
            </div>
            <FeaturedBooks />
          </div>
        </section>

        {/* Trending Books Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-brand-paleBlue">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-brand-blue" />
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Trending Now</h2>
              </div>
              <Button
                variant="ghost"
                className="gap-1 text-brand-blue hover:text-brand-mediumBlue hover:bg-brand-lightBlue/50"
              >
                View All <span className="sr-only">trending books</span>
              </Button>
            </div>
            <TrendingBooks />
          </div>
        </section>

        {/* New Arrivals Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-brand-blue" />
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">New Arrivals</h2>
              </div>
              <Button
                variant="ghost"
                className="gap-1 text-brand-blue hover:text-brand-mediumBlue hover:bg-brand-paleBlue"
              >
                View All <span className="sr-only">new arrivals</span>
              </Button>
            </div>
            <NewArrivals />
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-brand-blue text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Stay Updated</h2>
                <p className="mx-auto max-w-[700px] text-brand-paleBlue md:text-xl">
                  Subscribe to our newsletter to get updates on new releases, exclusive deals, and reading
                  recommendations.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-white/90 px-3 py-2 text-sm text-brand-blue ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter your email"
                    type="email"
                    required
                  />
                  <Button
                    type="submit"
                    variant="secondary"
                    className="bg-white text-brand-blue hover:bg-brand-paleBlue"
                  >
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
