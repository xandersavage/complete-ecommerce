"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

type MobileFilterDrawerProps = {
  isOpen: boolean
  onClose: () => void
  activeFilters: Record<string, string[]>
  applyFilters: (filterType: string, values: string[]) => void
  clearAllFilters: () => void
}

// Filter categories (same as in FilterSidebar)
const filterGroups = [
  {
    id: "categories",
    name: "Categories",
    options: [
      { value: "tops", label: "Tops & T-shirts" },
      { value: "bottoms", label: "Bottoms" },
      { value: "dresses", label: "Dresses & Jumpsuits" },
      { value: "outerwear", label: "Outerwear" },
      { value: "activewear", label: "Activewear" },
      { value: "swimwear", label: "Swimwear" },
      { value: "sleepwear", label: "Sleepwear" },
      { value: "accessories", label: "Accessories" },
      { value: "shoes", label: "Shoes" },
    ],
  },
  {
    id: "ages",
    name: "Age Range",
    options: [
      { value: "0-24m", label: "Babies (0-24 months)" },
      { value: "2-4y", label: "Toddlers (2-4 years)" },
      { value: "5-8y", label: "Kids (5-8 years)" },
      { value: "9-12y", label: "Pre-Teens (9-12 years)" },
      { value: "13+", label: "Teens (13+ years)" },
    ],
  },
  {
    id: "colors",
    name: "Colors",
    options: [
      { value: "black", label: "Black", color: "#000000" },
      { value: "white", label: "White", color: "#FFFFFF" },
      { value: "gray", label: "Gray", color: "#808080" },
      { value: "red", label: "Red", color: "#FF0000" },
      { value: "blue", label: "Blue", color: "#0000FF" },
      { value: "green", label: "Green", color: "#008000" },
      { value: "yellow", label: "Yellow", color: "#FFFF00" },
      { value: "purple", label: "Purple", color: "#800080" },
      { value: "pink", label: "Pink", color: "#FFC0CB" },
      { value: "orange", label: "Orange", color: "#FFA500" },
    ],
  },
  {
    id: "priceRange",
    name: "Price Range",
    options: [
      { value: "0-25", label: "Under $25" },
      { value: "25-50", label: "$ 25 - $ 50" },
      { value: "50-100", label: "$ 50 - $ 100" },
      { value: "100-200", label: "$ 100 - $ 200" },
      { value: "200-1000", label: "$ 200 +" },
    ],
  },
  {
    id: "tags",
    name: "Features",
    options: [
      { value: "new-arrival", label: "New Arrivals" },
      { value: "sale", label: "On Sale" },
      { value: "sustainable", label: "Sustainable" },
      { value: "organic", label: "Organic" },
      { value: "best-seller", label: "Best Seller" },
    ],
  },
]

const MobileFilterDrawer = ({
  isOpen,
  onClose,
  activeFilters,
  applyFilters,
  clearAllFilters,
}: MobileFilterDrawerProps) => {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  // Toggle filter option
  const toggleFilter = (groupId: string, value: string) => {
    const currentValues = activeFilters[groupId] || []
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value]

    applyFilters(groupId, newValues)
  }

  // Get active filter count
  const getActiveFilterCount = () => {
    return Object.values(activeFilters).reduce(
      (count, values) => count + values.length,
      0
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-sm bg-white shadow-xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-gray-400 hover:text-gray-500"
              >
                <X size={20} />
              </button>
            </div>

            {/* Filter Content - Scrollable */}
            <div className="px-4 py-4 h-[calc(100vh-120px)] overflow-y-auto">
              {filterGroups.map((group) => (
                <div key={group.id} className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    {group.name}
                  </h3>

                  <div className="space-y-2">
                    {group.options.map((option) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          id={`mobile-filter-${group.id}-${option.value}`}
                          name={`mobile-filter-${group.id}`}
                          value={option.value}
                          type="checkbox"
                          checked={(activeFilters[group.id] || []).includes(
                            option.value
                          )}
                          onChange={() => toggleFilter(group.id, option.value)}
                          className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />

                        <label
                          htmlFor={`mobile-filter-${group.id}-${option.value}`}
                          className="ml-3 text-sm text-gray-600"
                        >
                          {group.id === "colors" ? (
                            <div className="flex items-center">
                              <span
                                className="inline-block w-4 h-4 rounded-full mr-2 border border-gray-200"
                                style={{
                                  backgroundColor:
                                    "color" in option
                                      ? option.color
                                      : undefined,
                                }}
                              />
                              {option.label}
                            </div>
                          ) : (
                            option.label
                          )}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Actions */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 px-4 py-3 flex items-center justify-between bg-white">
              <button
                onClick={clearAllFilters}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Clear all
              </button>

              <button
                onClick={onClose}
                className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors"
              >
                View results ({getActiveFilterCount()})
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MobileFilterDrawer
