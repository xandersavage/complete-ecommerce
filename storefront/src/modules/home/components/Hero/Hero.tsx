"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Container from "@modules/layout/templates/container" // Adjust import path as needed

const Hero = () => {
  const [scrollY, setScrollY] = useState(0)

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative w-full overflow-hidden min-h-[90vh] flex items-center">
      {/* Decorative Elements - Floating Shapes */}
      <motion.div
        className="absolute top-[15%] left-[10%] w-16 h-16 rounded-full bg-purple-300 opacity-70 z-0 hidden md:block"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ translateY: scrollY * -0.1 }}
      />

      <motion.div
        className="absolute bottom-[20%] left-[15%] w-12 h-12 rounded-xl bg-yellow-300 opacity-70 z-0 hidden md:block"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ translateY: scrollY * 0.2 }}
      />

      <motion.div
        className="absolute top-[30%] right-[25%] w-10 h-10 rounded-lg bg-teal-400 opacity-70 z-0 hidden lg:block"
        animate={{
          y: [0, 10, 0],
          x: [0, 5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ translateY: scrollY * -0.15 }}
      />

      {/* Using the custom container for consistent spacing */}
      <Container className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-full">
          {/* Text Content */}
          <motion.div
            className="flex flex-col justify-center pt-20 lg:pt-0 w-full"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center mb-6">
              <div className="h-1 w-10 bg-purple-600 mr-3"></div>
              <p className="text-lg md:text-xl font-montserrat text-purple-600 tracking-wider">
                NEW SEASON COLLECTION
              </p>
            </div>

            <h1 className="font-palanquin font-bold text-4xl md:text-6xl lg:text-8xl leading-tight">
              <span className="relative">
                Express Their
                <motion.div
                  className="absolute -z-10 bottom-2 left-0 h-3 md:h-4 bg-yellow-300 opacity-50 w-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </span>
              <br />
              <span className="text-purple-600 mt-2 block">Unique Style</span>
            </h1>

            <p className="font-montserrat text-slate-gray text-base md:text-lg mt-6 mb-10 max-w-md">
              Discover clothing that celebrates childhood with comfort, color,
              and creativity. Let them shine with Elorad&apos;s playful designs.
            </p>

            <div className="flex flex-wrap gap-4 mb-16">
              <Link href="/collections" className="group">
                <motion.div
                  className="flex items-center gap-2 px-8 py-4 bg-purple-600 rounded-full text-white font-montserrat font-medium text-base md:text-lg transition-all duration-300 hover:bg-purple-700 hover:shadow-lg"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Shop Collection
                  <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: 5 }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </motion.div>
              </Link>

              <Link href="/categories" className="group">
                <motion.div
                  className="flex items-center gap-2 px-8 py-4 border-2 border-slate-gray rounded-full text-slate-gray font-montserrat font-medium text-base md:text-lg transition-all duration-300 hover:bg-slate-50 hover:shadow-md"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  By Age
                </motion.div>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { number: "1000+", label: "Products" },
                { number: "500+", label: "Happy Families" },
                { number: "4.9", label: "Customer Rating" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
                >
                  <p className="text-3xl md:text-4xl font-palanquin font-bold">
                    {stat.number}
                  </p>
                  <p className="text-sm md:text-base font-montserrat text-slate-gray">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="relative h-[50vh] md:h-[70vh] lg:h-[80vh] w-full flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* Background gradient circle */}
            <div
              className="absolute w-[90%] h-[90%] rounded-full bg-gradient-to-br from-purple-100 via-primary to-pale-blue opacity-80"
              style={{ transform: `translateY(${scrollY * 0.05}px)` }}
            />

            {/* Main image */}
            <motion.div
              className="relative z-10 w-full h-full"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{
                transform: `translateY(${scrollY * -0.08}px)`,
                perspective: "1000px",
              }}
            >
              <Image
                src="/assets/images/elorad/hero-2.png"
                alt="Children wearing Elorad clothing"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Floating product tags */}
            {[
              { label: "Eco-friendly", x: "10%", y: "20%", delay: 0.8 },
              { label: "100% Cotton", x: "75%", y: "30%", delay: 1.1 },
              { label: "Durable", x: "20%", y: "75%", delay: 1.4 },
            ].map((tag, index) => (
              <motion.div
                key={index}
                className="absolute bg-white px-4 py-2 rounded-full shadow-md text-sm font-medium font-montserrat text-slate-gray hidden md:flex items-center gap-2 z-20"
                style={{ left: tag.x, top: tag.y }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: tag.delay, duration: 0.6 }}
              >
                <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                {tag.label}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>

      {/* Bottom wave shape */}
      <div className="absolute bottom-0 left-0 w-full h-12 md:h-24 z-0 overflow-hidden">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M0 0L48 8.875C96 17.75 192 35.5 288 53.25C384 71 480 88.75 576 80.5C672 71 768 35.5 864 26.625C960 17.75 1056 35.5 1152 53.25C1248 71 1344 88.75 1392 97.625L1440 106.5V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V0Z"
            fill="#F5F6FF"
          />
        </svg>
      </div>
    </div>
  )
}

export default Hero
