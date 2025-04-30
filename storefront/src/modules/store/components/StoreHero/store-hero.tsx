"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const StoreHero = () => {
  const [scrollY, setScrollY] = useState(0)

  // Track scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative bg-gradient-to-r from-purple-50 to-blue-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-8 -right-8 w-64 h-64 rounded-full bg-purple-200 opacity-30"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        <div
          className="absolute top-40 -left-12 w-48 h-48 rounded-full bg-blue-200 opacity-30"
          style={{ transform: `translateY(${scrollY * 0.05}px)` }}
        />
        <div
          className="absolute bottom-10 right-1/4 w-32 h-32 rounded-full bg-yellow-200 opacity-30"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        />
      </div>

      <div className="container mx-auto px-4 py-8 md:py-16 lg:py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Hero Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-palanquin"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Discover Our{" "}
              <span className="text-purple-600">Children&apos;s</span>{" "}
              Collection
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg text-gray-600 mb-6 md:mb-8 max-w-md mx-auto md:mx-0 font-montserrat"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Explore our range of high-quality, sustainable clothing and
              accessories designed for comfort, style, and durability.
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center md:justify-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <LocalizedClientLink
                href="/collections/new-arrivals"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-colors text-sm sm:text-base"
              >
                New Arrivals
              </LocalizedClientLink>

              <LocalizedClientLink
                href="/collections/sale"
                className="bg-white hover:bg-gray-100 text-purple-600 border border-purple-600 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-colors text-sm sm:text-base"
              >
                Shop Sale
              </LocalizedClientLink>
            </motion.div>
          </div>

          {/* Hero Image */}
          <div className="w-full md:w-1/2 relative mt-8 md:mt-0">
            <motion.div
              className="relative h-64 sm:h-80 md:h-96 w-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Image
                src="/assets/images/elorad/hero-2.png"
                alt="Children's clothing collection"
                fill
                className="object-cover rounded-lg shadow-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />

              {/* Floating Elements - Responsive Positioning */}
              <motion.div
                className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 bg-white rounded-lg shadow-lg p-3 sm:p-4 flex items-center max-w-[200px] sm:max-w-none"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                style={{ transform: `translateY(${scrollY * 0.05}px)` }}
              >
                <div className="bg-purple-100 rounded-full p-1.5 sm:p-2 mr-2 sm:mr-3">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Sustainable</p>
                  <p className="text-xs sm:text-sm font-medium">
                    Eco-friendly materials
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 bg-white rounded-lg shadow-lg p-3 sm:p-4 max-w-[150px] sm:max-w-none"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                style={{ transform: `translateY(${scrollY * 0.08}px)` }}
              >
                <p className="text-xs sm:text-sm font-medium text-purple-600">
                  Free Shipping
                </p>
                <p className="text-xs text-gray-500">On orders over $50</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreHero
