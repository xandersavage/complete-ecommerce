import { Metadata } from "next"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"

export const metadata: Metadata = {
  title: "Elorad Store | Children's Fashion & Accessories",
  description:
    "Discover our collection of high-quality, stylish, and sustainable clothing and accessories for children and teens.",
}

type Params = {
  searchParams: {
    sortBy?: SortOptions
    page?: string
    categories?: string
    ages?: string
    colors?: string
    price_range?: string
    tags?: string
  }
  params: {
    countryCode: string
  }
}

export default async function StorePage({ searchParams, params }: Params) {
  const { sortBy, page, categories, ages, colors, price_range, tags } =
    searchParams

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
      categories={categories}
      ages={ages}
      colors={colors}
      priceRange={price_range}
      tags={tags}
    />
  )
}
