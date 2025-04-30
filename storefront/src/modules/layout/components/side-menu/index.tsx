"use client"

import { XMark } from "@medusajs/icons"
import { Text, useToggleState } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import { HttpTypes } from "@medusajs/types"
import { useEffect } from "react"
import {
  Home,
  ShoppingBag,
  Search,
  User,
  Heart,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"

const SideMenuItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Shop", href: "/store", icon: ShoppingBag },
  { name: "Search", href: "/search", icon: Search },
  { name: "Account", href: "/account", icon: User },
  { name: "Wishlist", href: "/wishlist", icon: Heart },
]

const SideMenu = ({
  regions,
  onClose,
  cart,
}: {
  regions: HttpTypes.StoreRegion[] | null
  onClose: () => void
  cart: any
}) => {
  const toggleState = useToggleState()
  const cartItemsCount = cart?.items?.length || 0

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  // Categories for quick access
  const categories = [
    { name: "New Arrivals", href: "/collections/new-arrivals" },
    { name: "Girls", href: "/collections/girls" },
    { name: "Boys", href: "/collections/boys" },
    { name: "Toddlers", href: "/collections/toddlers" },
    { name: "Babies", href: "/collections/babies" },
    { name: "Sale", href: "/collections/sale" },
  ]

  return (
    <div
      className="fixed inset-y-0 left-0 z-[9999] w-full max-w-[320px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out"
      data-testid="nav-menu-popup"
    >
      {/* Header Section */}
      <div className="flex items-center justify-between border-b border-gray-100 p-4">
        <h2 className="font-palanquin text-2xl font-bold text-gray-900">
          Menu
        </h2>
        <button
          onClick={onClose}
          className="rounded-full p-2 hover:bg-gray-100 transition-colors"
          aria-label="Close menu"
        >
          <XMark className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      {/* User & Cart Summary */}
      <div className="bg-purple-50 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
            <User size={20} className="text-purple-600" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">Hello, Guest</p>
            <LocalizedClientLink
              href="/account/login"
              className="text-xs text-purple-600 hover:underline"
              onClick={onClose}
            >
              Sign in
            </LocalizedClientLink>
          </div>
        </div>

        <LocalizedClientLink
          href="/cart"
          onClick={onClose}
          className="relative p-2 rounded-full bg-white shadow-sm"
        >
          <ShoppingBag size={20} className="text-gray-700" />
          {cartItemsCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartItemsCount > 9 ? "9+" : cartItemsCount}
            </span>
          )}
        </LocalizedClientLink>
      </div>

      {/* Main Navigation */}
      <nav className="p-4 border-b border-gray-100">
        <ul className="space-y-1">
          {SideMenuItems.map(({ name, href, icon: Icon }) => (
            <li key={name}>
              <LocalizedClientLink
                href={href}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-purple-50 transition-colors"
                onClick={onClose}
                data-testid={`${name.toLowerCase()}-link`}
              >
                <div className="flex items-center">
                  <Icon size={20} className="text-purple-600 mr-3" />
                  <span className="font-montserrat text-gray-700">{name}</span>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </LocalizedClientLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Shop Categories */}
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-medium text-sm text-gray-500 mb-3 uppercase tracking-wider">
          Shop Categories
        </h3>
        <ul className="space-y-1">
          {categories.map(({ name, href }) => (
            <li key={name}>
              <LocalizedClientLink
                href={href}
                className="block p-2 rounded-md hover:bg-gray-50 transition-colors text-gray-700"
                onClick={onClose}
              >
                {name}
              </LocalizedClientLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Country Selector */}
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-medium text-sm text-gray-500 mb-3 uppercase tracking-wider">
          Ship To
        </h3>
        <div className="bg-gray-50 rounded-lg p-3">
          {regions && (
            <CountrySelect toggleState={toggleState} regions={regions} />
          )}
        </div>
      </div>

      {/* Contact & Social */}
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-medium text-sm text-gray-500 mb-3 uppercase tracking-wider">
          Contact Us
        </h3>

        <div className="space-y-3">
          <a
            href="tel:+18005551234"
            className="flex items-center text-gray-700 hover:text-purple-600 transition-colors"
          >
            <Phone size={16} className="mr-2" />
            <span className="text-sm">1-800-555-1234</span>
          </a>

          <a
            href="mailto:hello@elorad.com"
            className="flex items-center text-gray-700 hover:text-purple-600 transition-colors"
          >
            <Mail size={16} className="mr-2" />
            <span className="text-sm">hello@elorad.com</span>
          </a>

          <div className="flex items-center space-x-4 pt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-purple-600 transition-colors"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-purple-600 transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-purple-600 transition-colors"
            >
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4">
        <Text className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Elorad. <br />
          All rights reserved.
        </Text>
      </div>
    </div>
  )
}

export default SideMenu
