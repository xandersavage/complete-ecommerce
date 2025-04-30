"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Heart, ShoppingBag } from "lucide-react"

interface ProductCardProps {
  product: {
    id: string
    title: string
    description?: string
    thumbnail?: string
    variants: {
      id: string
      calculated_price: {
        calculated_amount: number
      }
      prices: {
        amount: number
        currency_code: string
      }[]
    }[]
    handle: string
    isNew?: boolean // Optional prop for new items
  }
  region: {
    currency_code: string
  }
}

const ProductCard: React.FC<ProductCardProps> = ({ product, region }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  // Get the first price from the first variant
  const price =
    product.variants[0]?.calculated_price?.calculated_amount ||
    product.variants[0]?.prices?.[0]?.amount ||
    0

  // Format price with currency
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: region.currency_code.toUpperCase(),
  }).format(price)

  return (
    <div
      className="group relative w-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image with Link */}
      <Link href={`/products/${product.handle}`} className="block relative">
        <div className="relative w-full aspect-square overflow-hidden">
          {product.thumbnail ? (
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
              No image
            </div>
          )}

          {/* New Tag */}
          {product.isNew && (
            <div className="absolute top-3 left-3 bg-purple-600 text-white text-xs font-medium px-2 py-1 rounded-full z-10">
              NEW
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault() // Prevent link navigation
              setIsFavorite(!isFavorite)
            }}
            className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isFavorite
                  ? "fill-purple-600 text-purple-600"
                  : "text-slate-700"
              }`}
            />
          </button>
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-4">
        <Link href={`/products/${product.handle}`} className="block">
          <h3 className="font-palanquin font-bold text-lg text-slate-800 line-clamp-1 mb-1 group-hover:text-purple-600 transition-colors">
            {product.title}
          </h3>

          {product.description && (
            <p className="text-slate-500 text-sm line-clamp-2 mb-3 font-montserrat">
              {product.description}
            </p>
          )}
        </Link>

        <div className="flex justify-between items-center mt-2">
          <span className="text-lg font-bold text-purple-600 font-montserrat">
            {formattedPrice}
          </span>

          {/* Quick Add to Cart Button */}
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            aria-label="Add to Cart"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Quick View Overlay on Hover */}
      <div
        className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-purple-600/90 to-purple-600/0 text-white text-center py-3 transition-all duration-300 ${
          isHovered ? "h-12 opacity-100" : "h-0 opacity-0"
        }`}
      >
        <span className="font-medium">Quick View</span>
      </div>
    </div>
  )
}

export default ProductCard
