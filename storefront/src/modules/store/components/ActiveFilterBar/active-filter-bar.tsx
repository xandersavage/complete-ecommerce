"use client"

import { X } from "lucide-react"

type ActiveFilterBarProps = {
  activeFilters: Record<string, string[]>
  removeFilter: (filterType: string, values: string[]) => void
}

// Map filter IDs to readable names
const filterNameMap: Record<string, string> = {
  categories: "Category",
  ages: "Age",
  colors: "Color",
  priceRange: "Price",
  tags: "Feature",
}

// Map filter values to readable labels (simplified)
const getFilterLabel = (type: string, value: string): string => {
  // This is a simplified implementation
  // In a real app, you would map these values to their actual labels

  if (type === "priceRange") {
    const [min, max] = value.split("-")
    if (max === "1000") {
      return `$${min}+`
    }
    return `$${min} - $${max}`
  }

  // Convert kebab-case to Title Case
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

const ActiveFilterBar = ({
  activeFilters,
  removeFilter,
}: ActiveFilterBarProps) => {
  // Check if we have any active filters
  const hasFilters = Object.values(activeFilters).some(
    (values) => values.length > 0
  )

  if (!hasFilters) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(activeFilters).map(([filterType, values]) =>
        values.map((value) => (
          <div
            key={`${filterType}-${value}`}
            className="inline-flex items-center bg-purple-50 text-purple-800 text-sm rounded-full px-3 py-1"
          >
            <span className="text-purple-500 font-medium mr-1">
              {filterNameMap[filterType] || filterType}:
            </span>
            <span>{getFilterLabel(filterType, value)}</span>
            <button
              onClick={() => {
                const newValues = values.filter((v) => v !== value)
                removeFilter(filterType, newValues)
              }}
              className="ml-1 p-0.5 rounded-full hover:bg-purple-100"
            >
              <X size={14} />
            </button>
          </div>
        ))
      )}
    </div>
  )
}

export default ActiveFilterBar
