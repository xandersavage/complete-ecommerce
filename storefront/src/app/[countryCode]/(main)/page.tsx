import { Metadata } from "next"

import CustomerReviews from "@modules/home/components/CustomerReviews/CustomerReviews"
import Hero from "@modules/home/components/Hero/Hero"
import PopularProducts from "@modules/home/components/PopularProducts/PopularProducts"
import Services from "@modules/home/components/Services/Services"
import SpecialOffer from "@modules/home/components/SpecialOffer/SpecialOffer"
import Subscribe from "@modules/home/components/Subscribe/Subscribe"
import SuperQuality from "@modules/home/components/SuperQuality/SuperQuality"
import FeaturedProducts from "@modules/home/components/featured-products"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import LatestProductsCarousel from "@modules/home/components/LatestProductsCarousel/LatestProductsCarousel"

export const metadata: Metadata = {
  title: "Pawklan",
  description: "Wear the brave",
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  console.log("Collections:", collections) // Add this
  console.log("Region:", region) // Add this

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <section className="xl:padding-l wide:padding-r padding-b">
        <Hero />
      </section>

      {/* Add Featured Products Section */}
      <section className="padding">
        <LatestProductsCarousel region={region} />
      </section>

      <section className="padding">
        <PopularProducts />
      </section>
      <section className="padding">
        <SuperQuality />
      </section>
      <section className="padding-x py-10">
        <Services />
      </section>
      <section className="padding">
        <SpecialOffer />
      </section>
      <section className="padding bg-pale-blue">
        <CustomerReviews />
      </section>
      <section className="padding-x sm:py-32 py-16 w-full">
        <Subscribe />
      </section>
    </>
  )
}
