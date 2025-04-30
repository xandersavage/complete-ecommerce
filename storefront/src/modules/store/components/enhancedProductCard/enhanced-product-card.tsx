"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, ShoppingBag, Eye } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { getProductPrice } from "@lib/util/get-product-price"
import QuickViewModal from "@modules/store/components/QuickViewModal/quick-view-modal"

type EnhancedProductCardProps = {
  product: any
  region: any
}

const EnhancedProductCard = ({ product, region }: EnhancedProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showQuickView, setShowQuickView] = useState(false)

  // Get product price and discount
  const { cheapestPrice } = getProductPrice({
    product,
    variantId: undefined,
  })

  // Get formatted amount
  const formattedPrice = cheapestPrice?.calculated_price || "N/A"
  const formattedOriginalPrice = cheapestPrice?.original_price || null
  const discount = cheapestPrice?.percentage_diff
    ? parseInt(cheapestPrice.percentage_diff)
    : 0

  // Check if product is new (within last 14 days)
  const isNew = () => {
    if (!product.created_at) return false
    const createdAt = new Date(product.created_at)
    const now = new Date()
    const differenceInDays = Math.floor(
      (now.getTime() - createdAt.getTime()) / (1000 * 3600 * 24)
    )
    return differenceInDays <= 14
  }

  // Get age range from tags or metadata
  const getAgeRange = () => {
    // Check product tags first
    if (product.tags && product.tags.length > 0) {
      const ageTag = product.tags.find(
        (tag: any) =>
          tag.value?.toLowerCase().includes("age") ||
          tag.value?.toLowerCase().includes("years")
      )
      if (ageTag) return ageTag.value
    }

    // Check metadata as fallback
    if (product.metadata && product.metadata.age_range) {
      return product.metadata.age_range
    }

    return null
  }

  // Handle wishlist toggle
  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
    // Implement actual wishlist functionality here
  }

  // Handle quick view
  const openQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowQuickView(true)
  }

  return (
    <>
      <div
        className="group relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image */}
        <div className="aspect-[3/4] w-full overflow-hidden rounded-lg bg-gray-100 relative">
          <LocalizedClientLink href={`/products/${product.handle}`}>
            {/* Main Product Image */}
            <div className="h-full w-full relative">
              {product.thumbnail ? (
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  priority={false}
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-gray-100">
                  <p className="text-gray-400">No image</p>
                </div>
              )}
            </div>

            {/* Second Image on Hover (if available) */}
            {product.images && product.images.length > 1 && (
              <div
                className={`absolute inset-0 transition-opacity duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={product.images[1].url}
                  alt={`${product.title} - alternate view`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover object-center"
                />
              </div>
            )}
          </LocalizedClientLink>

          {/* Quick Actions */}
          <div
            className={`absolute bottom-4 left-0 right-0 flex justify-center transition-all duration-300 ${
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-md">
              {/* Quick View Button */}
              <button
                onClick={openQuickView}
                className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Quick view"
              >
                <Eye size={18} className="text-gray-700" />
              </button>

              {/* Add to Cart Button */}
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  // Implement add to cart functionality
                }}
                className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Add to cart"
              >
                <ShoppingBag size={18} className="text-gray-700" />
              </button>

              {/* Wishlist Button */}
              <button
                onClick={toggleWishlist}
                className={`p-1.5 rounded-full transition-colors ${
                  isWishlisted
                    ? "text-red-500 hover:bg-red-50"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                aria-label={
                  isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                }
              >
                <Heart
                  size={18}
                  fill={isWishlisted ? "currentColor" : "none"}
                />
              </button>
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {discount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                {Math.round(discount)}% OFF
              </span>
            )}

            {isNew() && (
              <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-md">
                NEW
              </span>
            )}

            {getAgeRange() && (
              <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                {getAgeRange()}
              </span>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-3">
          {/* Title */}
          <h3 className="text-sm font-medium text-gray-900 font-montserrat">
            <LocalizedClientLink href={`/products/${product.handle}`}>
              {product.title}
            </LocalizedClientLink>
          </h3>

          {/* Price - Modified to only show strike-through when there's a discount */}
          <div className="mt-1 flex items-center">
            <p className="text-sm font-semibold text-gray-900">
              {formattedPrice}
            </p>
            {discount > 0 && formattedOriginalPrice && (
              <p className="ml-2 text-sm text-gray-500 line-through">
                {formattedOriginalPrice}
              </p>
            )}
          </div>

          {/* Removed color options section */}
        </div>
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <QuickViewModal
          product={product}
          region={region}
          onClose={() => setShowQuickView(false)}
        />
      )}
    </>
  )
}

export default EnhancedProductCard
