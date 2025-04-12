"use client"

import { useEffect, useState, useCallback, useMemo, useRef } from "react"
import { motion, AnimatePresence, useMotionValue } from "framer-motion"
import { getProductsListCarousel } from "@lib/data/products"
import ProductCard from "@modules/home/components/ProductCard/ProductCard"
import { Spinner } from "@medusajs/icons"

const LatestProductsCarousel = ({ region }: { region: any }) => {
  // Configuration constants
  const LIMIT = 8 // Number of products to load per batch
  const LOAD_THRESHOLD = 0.7 // 70% scroll threshold for loading more products
  const AUTO_SCROLL_SPEED = 1 // Pixels per frame for smooth scrolling
  const AUTO_SCROLL_INTERVAL = 30 // Milliseconds between scroll updates

  // State management
  const [products, setProducts] = useState<any[]>([]) // Holds all loaded products
  const [page, setPage] = useState(1) // Current page number
  const [isLoading, setIsLoading] = useState(true) // Initial load state
  const [isFetching, setIsFetching] = useState(false) // Subsequent loads state
  const [error, setError] = useState<string | null>(null) // Error state
  const [hasMore, setHasMore] = useState(true) // Whether more products are available
  const [isHovered, setIsHovered] = useState(false) // Pause scrolling on hover

  // Refs for managing auto-scroll
  const containerRef = useRef<HTMLDivElement>(null)
  const autoScrollRef = useRef<number | null>(null)

  // Framer Motion value for tracking horizontal scroll position
  const x = useMotionValue(0)
  const [dragging, setDragging] = useState(false)

  // Main product fetching function
  const fetchProducts = useCallback(
    async (pageNumber: number) => {
      try {
        const { response } = await getProductsListCarousel({
          pageParam: (pageNumber - 1) * LIMIT, // Convert page to offset
          queryParams: {
            limit: LIMIT,
            offset: (pageNumber - 1) * LIMIT,
          },
          countryCode: region.countries[0].iso_2,
        })

        // Update product list and check if more products are available
        setProducts((prev) => [...prev, ...response.products])
        setHasMore(response.products.length === LIMIT)
      } catch (err) {
        setError("Failed to load products. Please try again later.")
        console.error("Product fetch error:", err)
      } finally {
        // Update loading states
        if (pageNumber === 1) {
          setIsLoading(false)
        } else {
          setIsFetching(false)
        }
      }
    },
    [region]
  )

  // Auto-scroll implementation
  const performAutoScroll = useCallback(() => {
    if (containerRef.current && !isHovered && !dragging) {
      const container = containerRef.current
      const currentX = x.get()
      const maxScroll = -(products.length * 300 - window.innerWidth)

      // If we've reached the end, reset to the beginning
      if (currentX <= maxScroll) {
        x.set(0)
      } else {
        // Smooth scrolling
        x.set(currentX - AUTO_SCROLL_SPEED)
      }
    }
  }, [x, products.length, isHovered, dragging])

  // Setup auto-scroll effect
  useEffect(() => {
    if (!isLoading) {
      autoScrollRef.current = window.setInterval(
        performAutoScroll,
        AUTO_SCROLL_INTERVAL
      )

      return () => {
        if (autoScrollRef.current) {
          window.clearInterval(autoScrollRef.current)
        }
      }
    }
  }, [isLoading, performAutoScroll])

  // Initial load effect
  useEffect(() => {
    fetchProducts(1)
  }, [fetchProducts])

  // Drag end handler for infinite scroll
  const handleDragEnd = useCallback(() => {
    setDragging(false)
    const container = document.getElementById("carousel-container")
    if (!container) return

    // Calculate scroll position
    const containerWidth = container.offsetWidth
    const scrollWidth = container.scrollWidth
    const currentX = x.get()
    const scrollPercentage = Math.abs(currentX) / (scrollWidth - containerWidth)

    // Load more products if threshold reached and there's more to load
    if (scrollPercentage > LOAD_THRESHOLD && hasMore && !isFetching) {
      setIsFetching(true)
      setPage((prev) => {
        const nextPage = prev + 1
        fetchProducts(nextPage)
        return nextPage
      })
    }
  }, [x, hasMore, isFetching, fetchProducts])

  // Error state display
  if (error) {
    return (
      <div className="text-red-500 p-4 text-center" aria-live="assertive">
        {error}
      </div>
    )
  }

  return (
    <section
      className="padding bg-pale-blue"
      aria-label="Latest Product Arrivals Carousel"
    >
      <h2 className="text-4xl font-palanquin font-bold mb-4 md:mb-6">
        Our <span className="text-coral-red">Latest</span> Arrivals
      </h2>

      <div
        className="relative overflow-hidden"
        id="carousel-container"
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isLoading ? (
          // Initial loading spinner
          <div className="flex justify-center items-center h-full w-full">
            <Spinner
              className="animate-spin text-coral-red h-12 w-12"
              aria-label="Loading products"
            />
          </div>
        ) : (
          // Carousel content
          <motion.div
            className="flex gap-8 cursor-grab active:cursor-grabbing"
            style={{ x }}
            drag="x"
            dragConstraints={{
              left: -(products.length * 300 - window.innerWidth),
              right: 0,
            }}
            onDragStart={() => setDragging(true)}
            onDragEnd={handleDragEnd}
            dragElastic={0.1}
            aria-roledescription="Carousel of latest products"
          >
            <AnimatePresence initial={false}>
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  className="min-w-[300px] sm:min-w-[45%] md:min-w-[30%] lg:min-w-[23%] flex-shrink-0"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard
                    product={{
                      ...product,
                      description: product.description ?? undefined,
                    }}
                    region={region}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Loading more products spinner */}
        {isFetching && (
          <div className="absolute bottom-0 left-0 right-0 flex justify-center p-2">
            <Spinner
              className="animate-spin text-coral-red h-8 w-8"
              aria-label="Loading more products"
            />
          </div>
        )}
      </div>
    </section>
  )
}

export default LatestProductsCarousel
