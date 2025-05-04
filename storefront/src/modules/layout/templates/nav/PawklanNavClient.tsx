"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { headerLogo } from "../../../../../public/assets/images"
import { navLinks } from "../../../../../public/constants"
import SideMenu from "@modules/layout/components/side-menu"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartDropdown from "@modules/layout/components/cart-dropdown"
import CountrySelect from "@modules/layout/components/country-select"
import SearchModal from "@modules/search/templates/search-modal"
import { useToggleState } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"
import {
  Menu,
  ShoppingBag,
  Search,
  User,
  ChevronDown,
  Heart,
} from "lucide-react"

type PawklanNavClientProps = {
  regions: HttpTypes.StoreRegion[] | null
  cart: HttpTypes.StoreCart | null
}

const PawklanNavClient = ({ regions, cart }: PawklanNavClientProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const toggleState = useToggleState()
  const cartItemsCount = cart?.items?.length || 0

  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const handleSearch = () => {
    setIsSearchOpen(true)
  }

  const closeSearch = () => {
    setIsSearchOpen(false)
  }

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-purple-600 text-white py-2 text-center text-sm font-medium">
        <p>Free shipping on orders over $50 • 30-day easy returns</p>
      </div>

      <header
        className={`w-full z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-white/95 backdrop-blur-md shadow-md"
            : "py-5 bg-white"
        }`}
      >
        {/* Top Navigation - Desktop Only */}
        <div className="hidden lg:block border-b border-gray-100 pb-2">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <LocalizedClientLink
                href="/about"
                className="hover:text-purple-600 transition-colors"
              >
                About Us
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/contact"
                className="hover:text-purple-600 transition-colors"
              >
                Contact
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/blog"
                className="hover:text-purple-600 transition-colors"
              >
                Blog
              </LocalizedClientLink>
            </div>

            <div className="flex items-center space-x-6">
              {/* Country Selector */}
              <div
                className="relative"
                onMouseEnter={toggleState.open}
                onMouseLeave={toggleState.close}
              >
                <button className="flex items-center text-sm text-gray-600 hover:text-purple-600 transition-colors">
                  <span className="mr-1">Ship to:</span>
                  <span className="font-medium">Nigeria</span>
                  <ChevronDown size={16} className="ml-1" />
                </button>

                {regions && toggleState.state && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
                    <CountrySelect
                      toggleState={toggleState}
                      regions={regions}
                    />
                  </div>
                )}
              </div>

              <LocalizedClientLink
                href="/account"
                className="flex items-center text-sm text-gray-600 hover:text-purple-600 transition-colors"
              >
                <User size={16} className="mr-1" />
                <span>My Account</span>
              </LocalizedClientLink>

              <LocalizedClientLink
                href="/wishlist"
                className="flex items-center text-sm text-gray-600 hover:text-purple-600 transition-colors"
              >
                <Heart size={16} className="mr-1" />
                <span>Wishlist</span>
              </LocalizedClientLink>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="container mx-auto px-4 py-2">
          <nav className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-700"
              onClick={toggleMenu}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>

            {/* Logo */}
            <h1 className="lg:mr-12 text-2xl font-bold text-gray-700 transform hover:scale-105 transition-transform duration-200 cursor-pointer">
              Kiddies
            </h1>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex flex-1 items-center justify-center">
              <ul className="flex items-center space-x-8">
                {navLinks
                  .filter((link) => link.label !== "Cart")
                  .map((link) => (
                    <li key={link.label}>
                      <LocalizedClientLink
                        href={link.href}
                        className="font-medium text-gray-700 hover:text-purple-600 transition-colors py-2 px-1 relative group"
                      >
                        {link.label}
                        {/* Animated underline effect */}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300 ease-in-out"></span>
                      </LocalizedClientLink>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <button
                onClick={handleSearch}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-700"
                aria-label="Search"
              >
                <Search size={22} />
              </button>

              {/* Cart */}
              <div className="relative">
                <CartDropdown cart={cart} />
              </div>
            </div>
          </nav>
        </div>

        {/* Mobile Category Navigation - Shown on scroll */}
        <div
          className={`lg:hidden overflow-x-auto scrollbar-hide transition-all duration-300 ${
            scrolled
              ? "h-10 opacity-100 border-t border-gray-100"
              : "h-0 opacity-0"
          }`}
        >
          <div className="flex items-center space-x-6 px-4 h-full whitespace-nowrap">
            {[
              "New Arrivals",
              "Girls",
              "Boys",
              "Toddlers",
              "Babies",
              "Accessories",
              "Sale",
            ].map((category) => (
              <LocalizedClientLink
                key={category}
                href={`/collections/${category
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
              >
                {category}
              </LocalizedClientLink>
            ))}
          </div>
        </div>
      </header>

      {/* Side Menu */}
      {isMenuOpen && (
        <SideMenu onClose={toggleMenu} regions={regions} cart={cart} />
      )}

      {/* Overlay when menu is open */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[9998]"
          onClick={toggleMenu}
        />
      )}

      {/* Search Modal */}
      {isSearchOpen && <SearchModal onClose={closeSearch} />}
    </>
  )
}

export default PawklanNavClient
