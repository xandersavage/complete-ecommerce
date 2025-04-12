"use client"

import { useState } from "react"
import Image from "next/image"
import { headerLogo } from "../../../../../public/assets/images"
import { hamburger } from "../../../../../public/assets/icons"
import { navLinks } from "../../../../../public/constants"
import SideMenu from "@modules/layout/components/side-menu"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartDropdown from "@modules/layout/components/cart-dropdown"

const PawklanNavClient = ({ regions, cart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  return (
    <header className="padding-x py-6 sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-100">
      <nav className="flex justify-between items-center max-container">
        {/* Mobile Hamburger Menu (Left) */}
        <div className="lg:hidden">
          <button
            className="focus:outline-none p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            onClick={toggleMenu}
          >
            <Image
              src={hamburger}
              alt="Menu"
              width={25}
              height={25}
              className="hover:opacity-80 transition-opacity"
            />
          </button>
        </div>

        {/* Logo (Centered on Mobile) */}
        <a
          href="/"
          className="lg:mx-0 mx-auto lg:flex-1 transform hover:scale-105 transition-transform duration-200"
        >
          <Image
            priority
            src={headerLogo}
            alt="Pawklan Logo"
            width={130}
            height={29}
            className="lg:w-[130px] w-[110px] drop-shadow-sm"
          />
        </a>

        {/* Desktop Navigation (Hidden on Mobile) */}
        <ul className="flex-1 flex justify-center items-center gap-8 max-lg:hidden">
          {navLinks.map((link) => (
            <li key={link.label}>
              {link.label === "Cart" ? (
                <CartDropdown cart={cart} />
              ) : (
                <LocalizedClientLink
                  href={link.href}
                  className="font-montserrat leading-normal text-lg text-slate-600 hover:text-slate-900 transition-colors duration-200 relative group"
                >
                  {link.label}
                  {/* Hover Underline Effect */}
                  <span className="absolute left-0 bottom-0 h-0.5 bg-coral-red w-0 group-hover:w-full transition-all duration-300"></span>
                </LocalizedClientLink>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Cart (Right) */}
        <div className="lg:hidden flex items-center gap-2">
          <CartDropdown cart={cart} />
        </div>
      </nav>

      {isMenuOpen && <SideMenu onClose={toggleMenu} regions={regions} />}
    </header>
  )
}

export default PawklanNavClient
