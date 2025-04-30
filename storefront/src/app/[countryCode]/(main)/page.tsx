import { Metadata } from "next"

import CategoryNavigation from "@modules/home/components/CategoryNavigation/CategoryNavigation"
import Hero from "@modules/home/components/Hero/Hero"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import LatestProductsCarousel from "@modules/home/components/LatestProductsCarousel/LatestProductsCarousel"
import ValueProposition from "@modules/home/components/ValueProposition/ValueProposition"
import Testimonials from "@modules/home/components/testimonials/Testimonials"
import Newsletter from "@modules/home/components/Newsletter/Newsletter"
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
      <section className="">
        <Hero />
      </section>

      <section className="padding">
        <CategoryNavigation />
      </section>

      <section className="">
        <LatestProductsCarousel region={region} />
      </section>

      <section className="padding">
        <ValueProposition />
      </section>

      <section className="padding">
        <Testimonials />
      </section>

      <section className="padding">
        <Newsletter />
      </section>
    </>
  )
}
