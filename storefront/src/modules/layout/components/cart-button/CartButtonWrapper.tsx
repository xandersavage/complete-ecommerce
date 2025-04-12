import CartButton from "."
import { enrichLineItems, retrieveCart } from "@lib/data/cart"

// This function fetches the cart data on the server side
const fetchCart = async () => {
  const cart = await retrieveCart()

  if (!cart) return null

  if (cart?.items?.length) {
    const enrichedItems = await enrichLineItems(cart.items, cart.region_id!)
    cart.items = enrichedItems
  }

  return cart
}

// Server Component Wrapper
export default async function CartButtonWrapper() {
  const cart = await fetchCart()
  return <CartButton cart={cart} />
}
