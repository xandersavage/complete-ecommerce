"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { getProductsListWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import EnhancedProductCard from "@modules/store/components/enhancedProductCard/enhanced-product-card"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import NoResults from "@modules/store/components/NoResult/no-results"
import LoadingSpinner from "@modules/store/components/LoadingSpinner/loading-spinner"

const PRODUCT_LIMIT = 12

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
  order?: string
  tags?: string[]
  price_range?: {
    min: number
    max: number
  }
}

type ActiveFilters = Record<string, string[]>

export default function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  productsIds,
  countryCode,
  activeFilters,
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string
  productsIds?: string[]
  countryCode: string
  activeFilters?: ActiveFilters
}) {
  const [products, setProducts] = useState<any[]>([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [region, setRegion] = useState<any>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      console.log("Fetching products for page:", page)

      try {
        const regionData = await getRegion(countryCode)
        setRegion(regionData)

        if (!regionData) {
          setLoading(false)
          return
        }

        const queryParams: PaginatedProductsParams = {
          limit: PRODUCT_LIMIT,
          // Note: Don't calculate offset here. Let the getProductsListWithSort function handle it.
        }

        // Add base filters
        if (collectionId) {
          queryParams.collection_id = [collectionId]
        }

        if (categoryId) {
          queryParams.category_id = [categoryId]
        }

        if (productsIds) {
          queryParams.id = productsIds
        }

        // Add sort options
        if (sortBy === "created_at") {
          queryParams.order = "created_at"
        }

        // Add active filters
        if (activeFilters) {
          // Add tags filter
          if (activeFilters.tags && activeFilters.tags.length > 0) {
            queryParams.tags = activeFilters.tags
          }

          // Add price range filter
          if (activeFilters.priceRange && activeFilters.priceRange.length > 0) {
            const [min, max] = activeFilters.priceRange[0]
              .split("-")
              .map(Number)
            queryParams.price_range = { min, max }
          }
        }

        console.log("API query params:", queryParams)

        const { response } = await getProductsListWithSort({
          page, // Pass the page parameter directly
          queryParams,
          sortBy,
          countryCode,
        })

        console.log("Received products:", response.products.length)

        setProducts(response.products)
        setCount(response.count)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [
    sortBy,
    page,
    collectionId,
    categoryId,
    productsIds,
    countryCode,
    activeFilters,
  ])

  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <LoadingSpinner />
      </div>
    )
  }

  if (products.length === 0) {
    return <NoResults />
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
      >
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {products.map((product, index) => (
            <motion.li
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: "easeOut",
              }}
            >
              {region && (
                <EnhancedProductCard product={product} region={region} />
              )}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {totalPages > 1 && (
        <div className="mt-12">
          <Pagination page={page} totalPages={totalPages} />
        </div>
      )}
    </>
  )
}
