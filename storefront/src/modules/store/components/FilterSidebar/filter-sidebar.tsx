"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

type FilterSidebarProps = {
  activeFilters: Record<string, string[]>
  applyFilters: (filterType: string, values: string[]) => void
}

// Filter categories
const filterGroups = [
  {
    id: "colors",
    name: "Colors",
    options: [
      { value: "black", label: "Black", color: "#000000" },
      { value: "white", label: "White", color: "#FFFFFF" },
      { value: "gray", label: "Gray", color: "#808080" },
      { value: "blue", label: "Blue", color: "#0000FF" },
      { value: "red", label: "Red", color: "#FF0000" },
    ],
  },
  {
    id: "priceRange",
    name: "Price Range",
    options: [
      { value: "0-50", label: "Under $50" },
      { value: "50-100", label: "$ 50 - $ 100" },
      { value: "100+", label: "$ 100 +" },
    ],
  },
]

const FilterSidebar = ({ activeFilters, applyFilters }: FilterSidebarProps) => {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(
    filterGroups.map((group) => group.id)
  )

  // Toggle filter group expansion
  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    )
  }

  // Toggle filter option
  const toggleFilter = (groupId: string, value: string) => {
    const currentValues = activeFilters[groupId] || []
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value]

    applyFilters(groupId, newValues)
  }

  return (
    <div className="sticky top-28">
      <h2 className="text-lg font-bold text-gray-900 mb-4 font-palanquin">
        Filters
      </h2>

      <div className="space-y-4">
        {filterGroups.map((group) => (
          <div key={group.id} className="border-b border-gray-200 pb-4">
            <button
              className="flex w-full items-center justify-between py-2 text-left font-medium text-gray-900"
              onClick={() => toggleGroup(group.id)}
            >
              {group.name}
              {expandedGroups.includes(group.id) ? (
                <ChevronUp size={18} className="text-gray-500" />
              ) : (
                <ChevronDown size={18} className="text-gray-500" />
              )}
            </button>

            {expandedGroups.includes(group.id) && (
              <div className="mt-2 space-y-1">
                {group.options.map((option) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      id={`filter-${group.id}-${option.value}`}
                      name={`filter-${group.id}`}
                      value={option.value}
                      type="checkbox"
                      checked={(activeFilters[group.id] || []).includes(
                        option.value
                      )}
                      onChange={() => toggleFilter(group.id, option.value)}
                      className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />

                    <label
                      htmlFor={`filter-${group.id}-${option.value}`}
                      className="ml-3 text-sm text-gray-600 cursor-pointer"
                    >
                      {group.id === "colors" ? (
                        <div className="flex items-center">
                          <span
                            className="inline-block w-4 h-4 rounded-full mr-2 border border-gray-200"
                            style={{
                              backgroundColor:
                                "color" in option ? option.color : undefined,
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
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FilterSidebar
