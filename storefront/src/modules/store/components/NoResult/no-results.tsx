"use client"

import { motion } from "framer-motion"
import { ShoppingBag, Search, RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"

const NoResults = () => {
  const router = useRouter()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
        <Search size={24} className="text-purple-600" />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        No products found
      </h2>

      <p className="text-gray-600 max-w-md mb-8">
        We couldn&apos;t find any products matching your current filters. Try
        adjusting your selection or browse our recommendations below.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => router.back()}
          className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <ShoppingBag size={18} className="mr-2" />
          Continue Shopping
        </button>

        <button
          onClick={() => {
            // Clear filters by navigating to base store URL
            router.push("/store")
          }}
          className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          <RefreshCw size={18} className="mr-2" />
          Clear All Filters
        </button>
      </div>
    </motion.div>
  )
}

export default NoResults
