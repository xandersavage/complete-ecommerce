import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"
import { HttpTypes } from "@medusajs/types"
// import AgeRangeBadge from "@modules/products/components/age-range-badge"
import ProductReviews from "../components/product-reviews/ProductReviews"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  // Extract age range from metadata or tags
  const getAgeRange = () => {
    // This is a placeholder - implement based on your data structure
    const ageTag = product.tags?.find(
      (tag) =>
        tag.value?.toLowerCase().includes("age") ||
        tag.value?.toLowerCase().includes("years")
    )

    return ageTag?.value || null
  }

  return (
    <>
      {/* Hero Image Gallery - Full Width */}
      <div className="w-full mb-8">
        <ImageGallery images={product?.images || []} />
      </div>

      <div className="content-container">
        {/* Main Product Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
          {/* Product Information Column */}
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-y-2">
              {product.collection && (
                <div className="mb-2">
                  <ProductInfo product={product} />
                </div>
              )}

              {/* Age Range Badge - New Component */}
              {getAgeRange() && <AgeRangeBadge ageRange={getAgeRange()} />}
            </div>

            {/* Product Tabs - Moved up for better visibility */}
            <div className="w-full">
              <ProductTabs product={product} />
            </div>
          </div>

          {/* Product Actions Column */}
          <div className="flex flex-col gap-y-8">
            <Suspense
              fallback={
                <ProductActions
                  disabled={true}
                  product={product}
                  region={region}
                />
              }
            >
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>

            {/* Quick Benefits - New Section */}
            <div className="bg-purple-50 rounded-lg p-4 mt-4">
              <h3 className="font-semibold text-purple-900 mb-3">
                Why Parents Love This
              </h3>
              <ul className="space-y-2">
                {[
                  "Child-safe materials",
                  "Durable construction",
                  "Easy to clean",
                  "Comfortable fit",
                ].map((benefit, index) => (
                  <li
                    key={index}
                    className="flex items-center text-sm text-purple-800"
                  >
                    <svg
                      className="w-4 h-4 mr-2 text-purple-600"
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
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Product Reviews Section - New */}
        <div className="mt-16 border-t border-gray-200 pt-10">
          <ProductReviews productId={product.id} />
        </div>
      </div>

      {/* Related Products */}
      <div
        className="content-container my-16 small:my-32"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
