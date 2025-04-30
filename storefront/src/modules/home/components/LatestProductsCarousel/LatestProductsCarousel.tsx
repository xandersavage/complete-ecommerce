"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { motion, AnimatePresence, useMotionValue } from "framer-motion"
import { getProductsListCarousel } from "@lib/data/products"
import ProductCard from "@modules/home/components/ProductCard/ProductCard"
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react"
import Container from "@modules/layout/templates/container"

const LatestProductsCarousel = ({ region }: { region: any }) => {
  // Configuration constants
  const LIMIT = 8 // Number of products to load per batch
  const VISIBLE_ITEMS = { mobile: 1, tablet: 2, desktop: 4 } // Responsive visible items
  const AUTO_SCROLL_INTERVAL = 5000 // Auto-scroll every 5 seconds

  // State management
  const [products, setProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isTouching, setIsTouching] = useState(false)
  const [visibleItems, setVisibleItems] = useState(VISIBLE_ITEMS.desktop)

  // Refs for DOM elements and timers
  const containerRef = useRef<HTMLDivElement>(null)
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Framer Motion value for tracking horizontal scroll
  const x = useMotionValue(0)

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(VISIBLE_ITEMS.mobile)
      } else if (window.innerWidth < 1024) {
        setVisibleItems(VISIBLE_ITEMS.tablet)
      } else {
        setVisibleItems(VISIBLE_ITEMS.desktop)
      }
    }

    // Set initial value
    handleResize()

    // Add resize listener
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Fetch products function
  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true)
      const { response } = await getProductsListCarousel({
        pageParam: 0,
        queryParams: {
          limit: LIMIT,
          offset: 0,
        },
        countryCode: region.countries[0].iso_2,
      })

      // Process products to add age range data (this would come from your actual data)
      const processedProducts = response.products.map((product) => ({
        ...product,
        isNew: Math.random() > 0.5, // Simulate new product flag
        description: product.description ?? undefined,
      }))

      setProducts(processedProducts)
    } catch (err) {
      setError("We couldn't load our latest arrivals. Please try again later.")
      console.error("Product fetch error:", err)
    } finally {
      setIsLoading(false)
    }
  }, [region])

  // Initial load effect
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  // Auto-scroll functionality
  useEffect(() => {
    const startAutoScroll = () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current)
      }

      // Only auto-scroll if not being interacted with
      if (!isHovered && !isTouching && products.length > visibleItems) {
        autoScrollTimerRef.current = setInterval(() => {
          goToNext()
        }, AUTO_SCROLL_INTERVAL)
      }
    }

    if (!isLoading) {
      startAutoScroll()
    }

    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current)
      }
    }
  }, [isLoading, isHovered, isTouching, products.length, visibleItems])

  // Navigation functions
  const goToNext = useCallback(() => {
    if (products.length <= visibleItems) return

    setCurrentIndex((prev) => {
      // Calculate max index (products length - visible items)
      const maxIndex = Math.max(0, products.length - visibleItems)
      return prev >= maxIndex ? 0 : prev + 1
    })
  }, [products.length, visibleItems])

  const goToPrev = useCallback(() => {
    if (products.length <= visibleItems) return

    setCurrentIndex((prev) => {
      // Calculate max index (products length - visible items)
      const maxIndex = Math.max(0, products.length - visibleItems)
      return prev <= 0 ? maxIndex : prev - 1
    })
  }, [products.length, visibleItems])

  // Calculate item width based on visible items
  const getItemWidth = () => {
    if (!containerRef.current) return 300
    const containerWidth = containerRef.current.clientWidth
    const gap = 16 // gap-4 in Tailwind = 16px
    return (containerWidth - gap * (visibleItems - 1)) / visibleItems
  }

  // Error state display
  if (error) {
    return (
      <div
        className="bg-red-50 text-red-600 p-6 rounded-lg text-center my-8"
        aria-live="assertive"
      >
        <p className="font-medium text-lg">{error}</p>
        <button
          onClick={fetchProducts}
          className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-full transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-pale-blue overflow-hidden">
      <Container>
        <div className="flex justify-between items-end mb-8">
          <div>
            <div className="flex items-center mb-2">
              <Sparkles className="h-5 w-5 text-purple-600 mr-2" />
              <p className="text-purple-600 font-medium text-sm uppercase tracking-wider">
                Just Landed
              </p>
            </div>
            <h2 className="text-3xl md:text-4xl font-palanquin font-bold">
              Our Latest <span className="text-purple-600">Arrivals</span>
            </h2>
            <p className="text-slate-gray mt-2 max-w-md">
              Fresh styles that just hit our shelves. Be the first to discover
              our newest treasures.
            </p>
          </div>

          {/* Navigation Buttons - Only show if we have more products than visible slots */}
          {products.length > visibleItems && (
            <div className="flex gap-2">
              <button
                onClick={goToPrev}
                className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all hover:bg-purple-50 text-slate-gray hover:text-purple-600"
                aria-label="Previous products"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                onClick={goToNext}
                className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all hover:bg-purple-50 text-slate-gray hover:text-purple-600"
                aria-label="Next products"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        <div
          className="relative overflow-hidden"
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsTouching(true)}
          onTouchEnd={() => setIsTouching(false)}
        >
          {isLoading ? (
            // Skeleton loading state
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(visibleItems)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse"
                >
                  <div className="h-64 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/3 mt-4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Carousel content
            <motion.div
              className="flex gap-4"
              animate={{
                x: -currentIndex * (getItemWidth() + 16), // Item width + gap
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x > 100) {
                  goToPrev()
                } else if (info.offset.x < -100) {
                  goToNext()
                }
              }}
              onDragStart={() => setIsTouching(true)}
              onDragTransitionEnd={() => setIsTouching(false)}
            >
              <AnimatePresence initial={false}>
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    style={{ width: getItemWidth() }}
                    className="flex-shrink-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col relative">
                      {/* New Tag */}
                      {product.isNew && (
                        <div className="absolute top-3 left-3 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                          NEW
                        </div>
                      )}

                      {/* Product Card - Using your existing component but with additional props */}
                      <ProductCard
                        product={product}
                        region={region}
                        className="h-full" // Pass className to your ProductCard if it accepts it
                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* Pagination Dots */}
        {products.length > visibleItems && (
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({
              length: Math.ceil(products.length / visibleItems),
            }).map((_, index) => {
              const isActive = index === Math.floor(currentIndex / visibleItems)
              return (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * visibleItems)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    isActive
                      ? "bg-purple-600 w-6"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={isActive ? "true" : "false"}
                />
              )
            })}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-10">
          <a
            href="/products"
            className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-medium transition-colors"
          >
            View All Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </Container>
    </section>
  )
}

export default LatestProductsCarousel
