import { Text } from "@medusajs/ui"

import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { getProductsById } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const [pricedProduct] = await getProductsById({
    ids: [product.id!],
    regionId: region.id,
  })

  if (!pricedProduct) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
  })

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="
        block 
        group 
        transition-all 
        duration-300 
        transform 
        hover:scale-105 
        hover:shadow-lg 
        rounded-lg 
        overflow-hidden 
        bg-white 
        border 
        border-gray-200
      "
    >
      <div data-testid="product-wrapper" className="relative">
        {/* Thumbnail with Responsive Sizing and Hover Effect */}
        <div
          className="
          relative 
          w-full 
          aspect-square 
          md:aspect-[4/3] 
          overflow-hidden
        "
        >
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
            className="
              absolute 
              inset-0 
              w-full 
              h-full 
              object-cover 
              group-hover:scale-110 
              transition-transform 
              duration-300 
              ease-in-out
            "
          />
        </div>

        {/* Product Info Section with Responsive Typography */}
        <div
          className="
          p-4 
          bg-none 
          border-t 
          border-gray-200
        "
        >
          <div className="flex flex-col">
            <Text
              className="
                font-palanquin
                text-sm 
                md:text-base 
                font-semibold 
                text-gray-800 
                group-hover:text-primary-600 
                transition-colors 
                duration-300 
                truncate
                max-w-full
              "
              data-testid="product-title"
            >
              {product.title}
            </Text>

            <div
              className="
              flex 
              items-center 
              justify-between 
              mt-2
              font-montserrat
            "
            >
              {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
            </div>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
