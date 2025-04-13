"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

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
  // product.variants[0]?.prices?.find(
  //   (p) => p.currency_code === region.currency_code
  // )?.amount || 0

  //product[0].variants[0].calculated_price.calculated_amount

  // Format price with currency
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: region.currency_code.toUpperCase(),
  }).format(price) // Assuming price is in cents

  // Heart SVG Icon
  const HeartIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={`w-6 h-6 transition-colors duration-300 ${
        isFavorite
          ? "fill-red-500 text-red-500"
          : "fill-none stroke-current text-gray-600 hover:text-red-500"
      }`}
      strokeWidth="2"
      stroke="currentColor"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )

  // Shopping Cart SVG Icon
  const CartIcon = () => (
    <svg
      className="w-6 h-6 text-slate-700 group-hover:text-slate-900 transition-colors"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  )

  return (
    <div
      className="group relative w-full max-w-[300px] bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <Link href={`/products/${product.handle}`} className="block relative">
        <div className="relative w-full aspect-square overflow-hidden">
          {product.thumbnail && (
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
              priority
            />
          )}
        </div>
      </Link>

      {/* Favorite Button */}
      <button
        onClick={() => setIsFavorite(!isFavorite)}
        className="absolute top-4 right-4 z-10 bg-white/70 p-2 rounded-full hover:bg-white transition-colors"
        aria-label="Toggle Favorite"
      >
        <HeartIcon />
      </button>

      {/* Product Details */}
      <div className="p-4">
        <Link href={`/products/${product.handle}`}>
          <h3 className="text-lg font-semibold text-gray-800 truncate mb-2">
            {product.title}
          </h3>
        </Link>

        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-coral-red">
            {formattedPrice}
          </span>

          {/* Quick Add to Cart */}
          <button
            className={`
              transition-all duration-300 
              ${
                isHovered
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              }
              bg-coral-red text-white p-2 rounded-full 
              hover:bg-coral-red/90 
              flex items-center justify-center
            `}
            aria-label="Add to Cart"
          >
            <CartIcon />
          </button>
        </div>
      </div>

      {/* Hover Overlay (Optional) */}
      {isHovered && (
        <div className="absolute inset-0 bg-black/10 transition-all duration-300 pointer-events-none"></div>
      )}
    </div>
  )
}

export default ProductCard
