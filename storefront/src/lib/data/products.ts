import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { cache } from "react"
import { getRegion } from "./regions"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { sortProducts } from "@lib/util/sort-products"

export const getProductsById = cache(async function ({
  ids,
  regionId,
}: {
  ids: string[]
  regionId: string
}) {
  return sdk.store.product
    .list(
      {
        id: ids,
        region_id: regionId,
        fields: "*variants.calculated_price,+variants.inventory_quantity",
      },
      { next: { tags: ["products"] } }
    )
    .then(({ products }) => products)
})

export const getProductByHandle = cache(async function (
  handle: string,
  regionId: string
) {
  try {
    // Create a base parameters object with proper string conversion
    const baseParams: Record<string, string> = {
      handle,
      region_id: regionId,
      fields:
        "*variants.calculated_price,+variants.inventory_quantity,+variants.manage_inventory,+variants.allow_backorder",
    }

    // Create URLSearchParams from the properly formatted object
    const params = new URLSearchParams(baseParams)

    const response = await sdk.client.fetch(
      `/store/products?${params.toString()}`,
      {
        next: { tags: ["products"] },
        cache: "no-store", // Disable caching for this request
      }
    )

    const { products } = response as { products: HttpTypes.StoreProduct[] }
    return products[0]
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
})

export const getProductsList = cache(async function ({
  pageParam = 1,
  queryParams,
  countryCode,
}: {
  pageParam?: number
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
  countryCode: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
}> {
  const limit = queryParams?.limit || 12
  const validPageParam = Math.max(pageParam, 1)
  const offset = (validPageParam - 1) * limit
  const region = await getRegion(countryCode)

  if (!region) {
    return {
      response: { products: [], count: 0 },
      nextPage: null,
    }
  }
  return sdk.store.product
    .list(
      {
        limit,
        offset,
        region_id: region.id,
        fields: "*variants.calculated_price",
        ...queryParams,
      },
      { next: { tags: ["products"] } }
    )
    .then(({ products, count }) => {
      const nextPage = count > offset + limit ? pageParam + 1 : null

      return {
        response: {
          products,
          count,
        },
        nextPage: nextPage,
        queryParams,
      }
    })
})

/**
 * This will fetch 100 products to the Next.js cache and sort them based on the sortBy parameter.
 * It will then return the paginated products based on the page and limit parameters.
 */

// export const getProductsListWithSort = cache(async function ({
//   page = 0,
//   queryParams,
//   sortBy = "created_at",
//   countryCode,
// }: {
//   page?: number
//   queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
//   sortBy?: SortOptions
//   countryCode: string
// }): Promise<{
//   response: { products: HttpTypes.StoreProduct[]; count: number }
//   nextPage: number | null
//   queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
// }> {
//   const limit = queryParams?.limit || 12

//   const {
//     response: { products, count },
//   } = await getProductsList({
//     pageParam: 0,
//     queryParams: {
//       ...queryParams,
//       limit: 100,
//     },
//     countryCode,
//   })

//   const sortedProducts = sortProducts(products, sortBy)

//   // console.log(sortedProducts)

//   const pageParam = (page - 1) * limit

//   const nextPage = count > pageParam + limit ? pageParam + limit : null

//   const paginatedProducts = sortedProducts.slice(pageParam, pageParam + limit)

//   return {
//     response: {
//       products: paginatedProducts,
//       count,
//     },
//     nextPage,
//     queryParams,
//   }
// })
export const getProductsListWithSort = cache(async function ({
  page = 1, // Default to page 1
  queryParams,
  sortBy = "created_at",
  countryCode,
}: {
  page?: number
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
  sortBy?: SortOptions
  countryCode: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
}> {
  const limit = queryParams?.limit || 12

  // offset based on page number
  const offset = (page - 1) * limit

  const region = await getRegion(countryCode)
  if (!region) {
    return {
      response: { products: [], count: 0 },
      nextPage: null,
    }
  }

  try {
    // base parameters object with proper string conversion
    const baseParams: Record<string, string> = {
      limit: String(limit),
      offset: String(offset), // Use calculated offset here
      region_id: region.id,
      fields: "*variants.calculated_price,+variants.inventory_quantity",
    }

    // Safely merge queryParams by converting values to strings and filtering out undefined
    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && key !== "limit" && key !== "offset") {
          // Skip limit and offset from queryParams
          baseParams[key] = String(value)
        }
      })
    }

    console.log(
      `Fetching products with offset: ${offset}, limit: ${limit}, page: ${page}`
    )

    // Create URLSearchParams from the properly formatted object
    const params = new URLSearchParams(baseParams)

    const response = await sdk.client.fetch(
      `/store/products?${params.toString()}`,
      {
        next: { tags: ["products"] },
        cache: "no-store",
      }
    )
    const { products, count } = response as {
      products: HttpTypes.StoreProduct[]
      count: number
    }

    console.log(`Received ${products.length} products of total ${count}`)

    // Sort the products
    const sortedProducts = sortProducts(products, sortBy)

    // Calculate if there's a next page
    const nextPage = count > offset + limit ? page + 1 : null

    return {
      response: {
        products: sortedProducts || [],
        count,
      },
      nextPage,
      queryParams,
    }
  } catch (error) {
    console.error("Error fetching products:", error)
    return {
      response: { products: [], count: 0 },
      nextPage: null,
      queryParams,
    }
  }
})

export const getProductsListCarousel = cache(async function ({
  pageParam = 0,
  queryParams,
  countryCode,
}: {
  pageParam?: number
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
  countryCode: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
}> {
  const limit = queryParams?.limit || 8
  const region = await getRegion(countryCode)

  if (!region) {
    return {
      response: { products: [], count: 0 },
      nextPage: null,
    }
  }

  return sdk.store.product
    .list(
      {
        limit,
        offset: pageParam,
        region_id: region.id,
        fields: "*variants.calculated_price,+variants.inventory_quantity",
        // Remove any sorting parameters
        ...queryParams,
      },
      { next: { tags: ["products"] } }
    )
    .then(({ products, count }) => {
      const nextPage = count > pageParam + limit ? pageParam + limit : null

      return {
        response: {
          products: products || [],
          count,
        },
        nextPage,
        queryParams,
      }
    })
})
