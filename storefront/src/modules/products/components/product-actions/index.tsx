"use client"

import { Button } from "@medusajs/ui"
import { isEqual } from "lodash"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"

import { useIntersection } from "@lib/hooks/use-in-view"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/product-actions/option-select"

import MobileActions from "./mobile-actions"
import ProductPrice from "../product-price"
import { addToCart } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { Heart } from "lucide-react"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (variantOptions: any) => {
  return variantOptions?.reduce(
    (acc: Record<string, string | undefined>, varopt: any) => {
      if (
        varopt.option &&
        varopt.value !== null &&
        varopt.value !== undefined
      ) {
        acc[varopt.option.title] = varopt.value
      }
      return acc
    },
    {}
  )
}

export default function ProductActions({
  product,
  region,
  disabled,
}: ProductActionsProps) {
  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const countryCode = useParams().countryCode as string

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // update the options when a variant is selected
  const setOptionValue = (title: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [title]: value,
    }))
  }

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true
    }

    // If we allow back orders on the variant, we can add to cart
    if (selectedVariant?.allow_backorder) {
      return true
    }

    // If there is inventory available, we can add to cart
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true
    }

    // Otherwise, we can't add to cart
    return false
  }, [selectedVariant])

  // Get inventory status message
  const getInventoryStatus = () => {
    if (!selectedVariant) return null

    if (!inStock) return "Out of stock"

    if (
      selectedVariant.manage_inventory &&
      selectedVariant.inventory_quantity
    ) {
      if (selectedVariant.inventory_quantity <= 5) {
        return `Only ${selectedVariant.inventory_quantity} left in stock!`
      }
      return "In stock"
    }

    return "In stock"
  }

  const actionsRef = useRef<HTMLDivElement>(null)
  const inView = useIntersection(actionsRef, "0px")

  // Quantity handlers
  const incrementQuantity = () => {
    if (quantity < 10) setQuantity(quantity + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null

    setIsAdding(true)

    try {
      await addToCart({
        variantId: selectedVariant.id,
        quantity,
        countryCode,
      })

      // Show success state
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 3000)
    } catch (error) {
      console.error("Error adding to cart:", error)
    } finally {
      setIsAdding(false)
    }
  }

  // Add to wishlist (placeholder functionality)
  const handleAddToWishlist = () => {
    // Implement wishlist functionality here
    console.log("Added to wishlist:", selectedVariant?.id)
  }

  return (
    <div className="flex flex-col gap-y-2" ref={actionsRef}>
      <ProductPrice product={product} variant={selectedVariant} />

      {/* Inventory Status */}
      {selectedVariant && (
        <div
          className={`text-sm font-medium mb-2 ${
            !inStock
              ? "text-red-600"
              : selectedVariant.inventory_quantity &&
                selectedVariant.inventory_quantity <= 5
              ? "text-orange-600"
              : "text-green-600"
          }`}
        >
          {getInventoryStatus()}
        </div>
      )}

      {/* Variant Options */}
      <div>
        {(product.variants?.length ?? 0) > 1 && (
          <div className="flex flex-col gap-y-4">
            {(product.options || []).map((option) => {
              // Special handling for size option
              const isSize = option.title?.toLowerCase().includes("size")

              return (
                <div key={option.id}>
                  <OptionSelect
                    option={option}
                    current={options[option.title ?? ""]}
                    updateOption={setOptionValue}
                    title={option.title ?? ""}
                    data-testid="product-options"
                    disabled={!!disabled || isAdding}
                  />

                  {/* Size Guide Link - only for size options */}
                  {isSize && (
                    <button
                      className="text-xs text-purple-600 hover:text-purple-800 mt-1 underline"
                      onClick={() => {
                        // Scroll to size guide tab or open modal
                        document.getElementById("size-guide")?.scrollIntoView({
                          behavior: "smooth",
                        })
                      }}
                    >
                      Size Guide
                    </button>
                  )}
                </div>
              )
            })}
            <Divider />
          </div>
        )}
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center space-x-4 mt-4 mb-4">
        <span className="text-sm font-medium text-gray-700">Quantity:</span>
        <div className="flex items-center border border-gray-300 rounded-md">
          <button
            type="button"
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 disabled:opacity-50"
            onClick={decrementQuantity}
            disabled={quantity <= 1 || isAdding}
          >
            -
          </button>
          <span className="w-10 text-center">{quantity}</span>
          <button
            type="button"
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 disabled:opacity-50"
            onClick={incrementQuantity}
            disabled={quantity >= 10 || isAdding}
          >
            +
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-y-3">
        <Button
          onClick={handleAddToCart}
          disabled={!inStock || !selectedVariant || !!disabled || isAdding}
          variant="primary"
          className="w-full h-12 bg-purple-600 hover:bg-purple-700 transition-colors"
          isLoading={isAdding}
          data-testid="add-product-button"
        >
          {!selectedVariant
            ? "Select variant"
            : !inStock
            ? "Out of stock"
            : addedToCart
            ? "✓ Added to cart!"
            : "Add to cart"}
        </Button>

        <Button
          onClick={handleAddToWishlist}
          variant="secondary"
          className="w-full h-12 border border-purple-600 text-purple-600 hover:bg-purple-50"
        >
          <Heart size={18} className="mr-2" />
          Add to Wishlist
        </Button>
      </div>

      {/* Shipping & Returns Quick Info */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <svg
            className="w-5 h-5 mr-2 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          Free shipping on orders over $50
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <svg
            className="w-5 h-5 mr-2 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          Easy 30-day returns
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <svg
            className="w-5 h-5 mr-2 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          1-year quality guarantee
        </div>
      </div>

      <MobileActions
        product={product}
        variant={selectedVariant}
        options={options}
        updateOptions={setOptionValue}
        inStock={inStock}
        handleAddToCart={handleAddToCart}
        isAdding={isAdding}
        show={!inView}
        optionsDisabled={!!disabled || isAdding}
        quantity={quantity}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
      />
    </div>
  )
}
