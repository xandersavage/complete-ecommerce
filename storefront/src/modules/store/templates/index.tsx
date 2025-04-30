"use client"

import { Suspense, useState, useEffect } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "./paginated-products"
import StoreHero from "@modules/store/components/StoreHero/store-hero"
import FilterSidebar from "@modules/store/components/FilterSidebar/filter-sidebar"
import MobileFilterDrawer from "@modules/store/components/MobileFilterDrawer/mobile-filter-drawer"
import ActiveFilterBar from "@modules/store/components/ActiveFilterBar/active-filter-bar"
import CategoryNavigation from "@modules/store/components/CategoryNavigation/category-navigation"

type StoreTemplateProps = {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  categories?: string
  ages?: string
  colors?: string
  priceRange?: string
  tags?: string
}

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
  categories,
  ages,
  colors,
  priceRange,
  tags,
}: StoreTemplateProps) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>(
    {}
  )
  const [isFilterBarSticky, setIsFilterBarSticky] = useState(false)

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  // Parse filters from URL on initial load
  useEffect(() => {
    const filtersFromUrl: Record<string, string[]> = {}

    if (categories) filtersFromUrl.categories = categories.split(",")
    if (ages) filtersFromUrl.ages = ages.split(",")
    if (colors) filtersFromUrl.colors = colors.split(",")
    if (tags) filtersFromUrl.tags = tags.split(",")
    if (priceRange) filtersFromUrl.priceRange = [priceRange]

    setActiveFilters(filtersFromUrl)
  }, [categories, ages, colors, priceRange, tags])

  // Handle scroll for sticky filter bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsFilterBarSticky(scrollPosition > 350)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Apply filters function
  const applyFilters = (filterType: string, values: string[]) => {
    const newFilters = { ...activeFilters }

    if (values.length === 0) {
      delete newFilters[filterType]
    } else {
      newFilters[filterType] = values
    }

    setActiveFilters(newFilters)
    updateUrlWithFilters(newFilters)
  }

  // Clear all filters
  const clearAllFilters = () => {
    setActiveFilters({})

    // Reset URL to base path with just sort and page
    const params = new URLSearchParams()
    if (sort) params.set("sortBy", sort)
    if (pageNumber > 1) params.set("page", pageNumber.toString())

    const newUrl = `${pathname}${
      params.toString() ? `?${params.toString()}` : ""
    }`
    router.push(newUrl)
  }

  // Update URL with current filters
  const updateUrlWithFilters = (filters: Record<string, string[]>) => {
    const params = new URLSearchParams(searchParams.toString())

    // Remove existing filter params
    params.delete("categories")
    params.delete("ages")
    params.delete("colors")
    params.delete("price_range")
    params.delete("tags")

    // Add new filter params
    Object.entries(filters).forEach(([key, values]) => {
      if (values.length > 0) {
        if (key === "priceRange") {
          params.set("price_range", values[0])
        } else {
          params.set(key, values.join(","))
        }
      }
    })

    // Reset to page 1 when filters change
    params.set("page", "1")

    const newUrl = `${pathname}?${params.toString()}`
    router.push(newUrl)
  }

  // Toggle mobile filter drawer
  const toggleMobileFilters = () => {
    setMobileFiltersOpen(!mobileFiltersOpen)
  }

  // Check if any filters are active
  const hasActiveFilters = Object.values(activeFilters).some(
    (values) => values.length > 0
  )

  return (
    <>
      {/* Hero Section */}
      <StoreHero />

      {/* Category Navigation */}
      <div className="bg-white py-8 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <CategoryNavigation />
        </div>
      </div>

      {/* Filter Bar - becomes sticky on scroll */}
      <div
        className={`bg-white border-b border-gray-100 py-4 z-20 transition-all duration-300 ${
          isFilterBarSticky ? "fixed top-0 left-0 right-0 shadow-md" : ""
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {/* Mobile Filter Button */}
              <button
                onClick={toggleMobileFilters}
                className="md:hidden flex items-center text-gray-700 font-medium mr-4"
              >
                <Filter size={18} className="mr-2" />
                Filters
              </button>

              {/* Desktop Sort Controls */}
              <div className="hidden md:flex items-center">
                <span className="text-gray-500 mr-3">Sort by:</span>
                <select
                  value={sort}
                  onChange={(e) => {
                    const params = new URLSearchParams(searchParams.toString())
                    params.set("sortBy", e.target.value)
                    router.push(`${pathname}?${params.toString()}`)
                  }}
                  className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="created_at">Newest</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="popularity">Popularity</option>
                </select>
              </div>
            </div>

            {/* Active Filters / Clear Filters */}
            <div className="flex items-center">
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-purple-600 hover:text-purple-800 flex items-center"
                >
                  <X size={14} className="mr-1" />
                  Clear all filters
                </button>
              )}
            </div>
          </div>

          {/* Active Filter Bar */}
          {hasActiveFilters && (
            <div className="mt-3">
              <ActiveFilterBar
                activeFilters={activeFilters}
                removeFilter={applyFilters}
              />
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden md:block w-full md:w-64 flex-shrink-0">
            <FilterSidebar
              activeFilters={activeFilters}
              applyFilters={applyFilters}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 font-palanquin">
                All Products
              </h1>
              <p className="text-gray-500 mt-1 font-montserrat">
                Discover our collection of high-quality children's clothing and
                accessories
              </p>
            </div>

            {/* Product Grid */}
            <Suspense fallback={<SkeletonProductGrid />}>
              <PaginatedProducts
                sortBy={sort}
                page={pageNumber}
                countryCode={countryCode}
                activeFilters={activeFilters}
              />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-40"
              onClick={toggleMobileFilters}
            />
            <MobileFilterDrawer
              isOpen={mobileFiltersOpen}
              onClose={toggleMobileFilters}
              activeFilters={activeFilters}
              applyFilters={applyFilters}
              clearAllFilters={clearAllFilters}
            />
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default StoreTemplate
