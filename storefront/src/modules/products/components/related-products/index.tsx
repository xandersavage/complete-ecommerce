import { getRegion } from "@lib/data/regions"
import { getProductsList } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import ProductCard from "@modules/home/components/ProductCard/ProductCard"

type RelatedProductsProps = {
  product: HttpTypes.StoreProduct
  countryCode: string
}

type StoreProductParamsWithTags = HttpTypes.StoreProductParams & {
  tags?: string[]
  collection_id?: string[]
  is_giftcard?: boolean
}

type StoreProductWithTags = HttpTypes.StoreProduct & {
  tags?: { value: string }[]
}

export default async function RelatedProducts({
  product,
  countryCode,
}: RelatedProductsProps) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  // Define related products query parameters
  const queryParams: StoreProductParamsWithTags = {
    region_id: region.id,
    is_giftcard: false,
  }

  // Add collection filter if product belongs to a collection
  if (product.collection_id) {
    queryParams.collection_id = [product.collection_id]
  }

  // Add tags filter if product has tags
  const productWithTags = product as StoreProductWithTags
  if (productWithTags.tags) {
    queryParams.tags = productWithTags.tags
      .map((t) => t.value)
      .filter(Boolean) as string[]
  }

  // Fetch related products
  const products = await getProductsList({
    queryParams,
    countryCode,
  }).then(({ response }) => {
    return response.products.filter(
      (responseProduct) => responseProduct.id !== product.id
    )
  })

  if (!products.length) {
    return null
  }

  return (
    <section className="w-full py-16 bg-gradient-to-b from-white to-purple-50">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-palanquin font-bold text-slate-800 mb-4">
            You Might Also Like
          </h2>
          <p className="text-lg text-slate-600 font-montserrat max-w-2xl mx-auto">
            Discover more products that complement your style and preferences.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((relatedProduct) => (
            <div key={relatedProduct.id}>
              <ProductCard
                product={{
                  id: relatedProduct.id,
                  title: relatedProduct.title,
                  description: relatedProduct.description || undefined,
                  thumbnail: relatedProduct.thumbnail || undefined,
                  variants:
                    relatedProduct.variants?.map((variant) => ({
                      id: variant.id,
                      calculated_price: {
                        calculated_amount:
                          variant.calculated_price?.calculated_amount || 0,
                      },
                      prices: [
                        {
                          amount:
                            variant.calculated_price?.calculated_amount || 0,
                          currency_code:
                            variant.calculated_price?.currency_code || "usd",
                        },
                      ],
                    })) || [],
                  handle: relatedProduct.handle,
                  isNew: false,
                }}
                region={region}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
