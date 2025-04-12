"use client"

import { XMark } from "@medusajs/icons"
import { Text, clx, useToggleState } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import { HttpTypes } from "@medusajs/types"

const SideMenuItems = {
  Home: "/",
  Store: "/store",
  Search: "/search",
  Account: "/account",
  Cart: "/cart",
}

const SideMenu = ({
  regions,
  onClose,
}: {
  regions: HttpTypes.StoreRegion[] | null
  onClose: () => void
}) => {
  const toggleState = useToggleState()

  return (
    // Backdrop with smooth animation
    <div className="fixed inset-0 z-[9999] transition-all duration-300">
      {/* Menu Container with slide animation */}
      <div
        data-testid="nav-menu-popup"
        className="fixed left-0 h-screen w-full max-w-[300px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out"
      >
        {/* Header Section */}
        <div className="flex items-center justify-between border-b border-gray-100 p-4">
          <h2 className="font-montserrat text-xl font-bold">Menu</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <XMark className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-4">
          <ul className="flex flex-col space-y-4">
            {Object.entries(SideMenuItems).map(([name, href]) => (
              <li key={name}>
                <LocalizedClientLink
                  href={href}
                  className="group flex items-center space-x-2 rounded-lg p-2 transition-all hover:bg-gray-50"
                  onClick={onClose}
                  data-testid={`${name.toLowerCase()}-link`}
                >
                  <span className="font-montserrat text-lg text-gray-700 group-hover:text-coral-red transition-colors">
                    {name}
                  </span>
                  {/* Subtle right arrow on hover */}
                  <span className="opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                    →
                  </span>
                </LocalizedClientLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer Section */}
        <div className="absolute bottom-0 w-full border-t border-gray-100 p-4 space-y-4">
          {/* Region Selector */}
          <div
            className="rounded-lg bg-gray-50 p-3"
            onMouseEnter={toggleState.open}
            onMouseLeave={toggleState.close}
          >
            {regions && (
              <CountrySelect toggleState={toggleState} regions={regions} />
            )}
          </div>

          {/* Copyright */}
          <Text className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} PawKlan Store. <br />
            All rights reserved.
          </Text>
        </div>
      </div>
    </div>
  )
}

export default SideMenu
