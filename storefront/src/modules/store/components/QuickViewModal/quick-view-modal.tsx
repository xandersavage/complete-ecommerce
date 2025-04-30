"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ShoppingBag, Heart } from "lucide-react"
import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type QuickViewModalProps = {
  product: any
  region: any
  onClose: () => void
}

const QuickViewModal = ({ product, region, onClose }: QuickViewModalProps) => {
  const [selectedVariant, setSelectedVariant] = useState<any>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)

  // Initialize with first variant and image
  useEffect(() => {
    if (product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0])
    }

    if (product.images && product.images.length > 0) {
      setSelectedImage(product.images[0].url)
    } else if (product.thumbnail) {
      setSelectedImage(product.thumbnail)
    }
  }, [product])

  // Get product price and discount
  const { cheapestPrice } = getProductPrice({
    product,
    variantId: selectedVariant?.id,
  })

  // Get formatted amount
  const formattedPrice = cheapestPrice?.calculated_price || "N/A"
  const formattedOriginalPrice = cheapestPrice?.original_price || null
  const discount = cheapestPrice?.percentage_diff
    ? parseInt(cheapestPrice.percentage_diff)
    : 0

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  // Handle variant selection
  const handleVariantChange = (variantId: string) => {
    const variant = product.variants.find((v: any) => v.id === variantId)
    if (variant) {
      setSelectedVariant(variant)
    }
  }

  // Handle quantity changes
  const incrementQuantity = () => {
    if (quantity < 10) setQuantity(quantity + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  // Handle add to cart
  const handleAddToCart = () => {
    // Implement your add to cart logic here
    console.log("Adding to cart:", {
      product,
      variant: selectedVariant,
      quantity,
    })

    // Close modal after adding to cart
    onClose()
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-gray-500 hover:text-gray-700 z-10"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col md:flex-row">
            {/* Product Images */}
            <div className="w-full md:w-1/2 bg-gray-50">
              {/* Main Image */}
              <div className="aspect-square relative">
                {selectedImage && (
                  <Image
                    src={selectedImage}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                )}
              </div>

              {/* Image Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="p-4 flex overflow-x-auto gap-2">
                  {product.images.map((image: any) => (
                    <button
                      key={image.id}
                      className={`w-16 h-16 relative rounded-md overflow-hidden flex-shrink-0 ${
                        selectedImage === image.url
                          ? "ring-2 ring-purple-600"
                          : "ring-1 ring-gray-200"
                      }`}
                      onClick={() => setSelectedImage(image.url)}
                    >
                      <Image
                        src={image.url}
                        alt={`${product.title} - view`}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="w-full md:w-1/2 p-6 overflow-y-auto max-h-[90vh] md:max-h-none">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {product.title}
                </h2>

                {/* Price */}
                <div className="flex items-center mb-4">
                  <span className="text-xl font-bold text-gray-900">
                    {formattedPrice}
                  </span>
                  {formattedOriginalPrice && (
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      {formattedOriginalPrice}
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="ml-2 bg-red-100 text-red-800 text-xs font-semibold px-2 py-0.5 rounded">
                      {discount}% OFF
                    </span>
                  )}
                </div>

                {/* Short Description */}
                <p className="text-gray-600 text-sm mb-6">
                  {product.description?.substring(0, 150)}
                  {product.description?.length > 150 ? "..." : ""}
                </p>
              </div>

              {/* Variant Selection */}
              {product.variants && product.variants.length > 1 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    Variants
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant: any) => (
                      <button
                        key={variant.id}
                        className={`px-3 py-1 text-sm rounded-full border ${
                          selectedVariant?.id === variant.id
                            ? "border-purple-600 bg-purple-50 text-purple-800"
                            : "border-gray-300 text-gray-700 hover:border-gray-400"
                        }`}
                        onClick={() => handleVariantChange(variant.id)}
                      >
                        {variant.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Quantity
                </h3>
                <div className="flex items-center">
                  <button
                    onClick={decrementQuantity}
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md text-gray-600 hover:bg-gray-50"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <div className="w-12 h-8 flex items-center justify-center border-t border-b border-gray-300 text-gray-900">
                    {quantity}
                  </div>
                  <button
                    onClick={incrementQuantity}
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md text-gray-600 hover:bg-gray-50"
                    disabled={quantity >= 10}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-md flex items-center justify-center font-medium transition-colors"
                >
                  <ShoppingBag size={18} className="mr-2" />
                  Add to Cart
                </button>

                <button className="w-full border border-purple-600 text-purple-600 hover:bg-purple-50 py-3 px-4 rounded-md flex items-center justify-center font-medium transition-colors">
                  <Heart size={18} className="mr-2" />
                  Add to Wishlist
                </button>

                <LocalizedClientLink
                  href={`/products/${product.handle}`}
                  className="text-center text-sm text-purple-600 hover:text-purple-800 font-medium mt-2"
                >
                  View Full Details
                </LocalizedClientLink>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default QuickViewModal
