import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  // Helper to extract material info for quick specs
  const getMaterial = () => {
    if (product.material) return product.material

    // Try to extract from metadata or description as fallback
    const materialMatch = product.description?.match(/material:?\s*([^\.]+)/i)
    return materialMatch ? materialMatch[1].trim() : null
  }

  // Helper to extract key features from description
  const getKeyFeatures = () => {
    const features = []

    // Add material if available
    const material = getMaterial()
    if (material) features.push(`Made with ${material}`)

    // Add type if available
    if (product.type?.value) {
      features.push(product.type.value)
    }

    // Add origin if available
    if (product.origin_country) {
      features.push(`Made in ${product.origin_country}`)
    }

    // Add placeholder features if we don't have enough
    if (features.length < 3) {
      const placeholders = [
        "Child-friendly design",
        "Easy to clean",
        "Comfortable fit",
        "Durable construction",
      ]

      for (let i = 0; features.length < 3 && i < placeholders.length; i++) {
        features.push(placeholders[i])
      }
    }

    return features
  }

  return (
    <div id="product-info" className="flex flex-col gap-y-4">
      {/* Collection Link */}
      {product.collection && (
        <LocalizedClientLink
          href={`/collections/${product.collection.handle}`}
          className="text-sm text-purple-600 hover:text-purple-800 transition-colors font-medium font-palanquin"
        >
          {product.collection.title}
        </LocalizedClientLink>
      )}

      {/* Product Title */}
      <Heading
        level="h1"
        className="text-3xl md:text-4xl leading-tight text-gray-900 font-bold font-palanquin"
        data-testid="product-title"
      >
        {product.title}
      </Heading>

      {/* Quick Specs */}
      <div className="mt-2">
        <ul className="grid grid-cols-1 gap-y-2">
          {getKeyFeatures().map((feature, index) => (
            <li
              key={index}
              className="flex items-center text-sm text-gray-600 font-montserrat"
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
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Product Description */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <Text
          className="text-base text-gray-700 whitespace-pre-line font-montserrat"
          data-testid="product-description"
        >
          {product.description}
        </Text>
      </div>

      {/* Safety Information - New Section */}
      <div className="mt-4 bg-green-50 rounded-lg p-4 border border-green-100">
        <h3 className="text-sm font-semibold text-green-800 mb-2">
          Safety Information
        </h3>
        <p className="text-sm text-green-700 font-montserrat">
          All our products meet or exceed safety standards for children's
          products. Made with non-toxic materials and regularly tested for
          quality and durability.
        </p>
      </div>
    </div>
  )
}

export default ProductInfo
