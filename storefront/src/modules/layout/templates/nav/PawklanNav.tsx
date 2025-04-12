import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import PawklanNavClient from "./PawklanNavClient"
import { retrieveCart, enrichLineItems } from "@lib/data/cart"

// This is a server component (no "use client")
export default async function PawKlanNav() {
  const fetchCart = async () => {
    const cart = await retrieveCart()

    if (!cart) {
      return null
    }

    if (cart?.items?.length) {
      const enrichedItems = await enrichLineItems(cart.items, cart.region_id!)
      cart.items = enrichedItems
    }

    return cart
  }

  const regions = await listRegions().then((regions: StoreRegion[]) => regions)
  const cart = await fetchCart()

  return <PawklanNavClient regions={regions} cart={cart} />
}
