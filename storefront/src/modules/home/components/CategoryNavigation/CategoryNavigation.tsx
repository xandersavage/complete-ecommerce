"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import Container from "@modules/layout/templates/container"
import { Shirt, BookOpen, Puzzle, Home } from "lucide-react"

const CategoryNavigation = () => {
  // State to track active age filter
  const [activeAge, setActiveAge] = useState<string>("all")
  // State to track view mode (product or age)
  const [viewMode, setViewMode] = useState<"product" | "age">("product")

  // Age ranges
  const ageRanges = [
    { id: "all", label: "All Ages" },
    { id: "toddlers", label: "Toddlers", range: "1-3 Years" },
    { id: "kids", label: "Kids", range: "4-8 Years" },
    { id: "preteens", label: "Pre-Teens", range: "9-12 Years" },
    { id: "teens", label: "Teens", range: "13-16 Years" },
  ]

  // Product categories
  const productCategories = [
    {
      id: "clothing",
      title: "Clothing & Accessories",
      description: "Comfortable, stylish outfits for every occasion",
      image: "/assets/images/elorad/hero-2.png",
      icon: Shirt,
    },
    {
      id: "books",
      title: "Books & Learning",
      description: "Educational and entertaining reads for growing minds",
      image: "/assets/images/elorad/hero-2.png",
      icon: BookOpen,
    },
    {
      id: "toys",
      title: "Toys & Games",
      description: "Fun activities that spark imagination and creativity",
      image: "/assets/images/elorad/hero-2.png",
      icon: Puzzle,
    },
    {
      id: "decor",
      title: "Room Decor",
      description: "Stylish accessories to personalize their space",
      image: "/assets/images/elorad/hero-2.png",
      icon: Home,
    },
  ]

  // Collections
  const featuredCollections = [
    {
      id: "summer",
      title: "Summer Essentials",
      description: "Everything they need for sunny adventures",
      image: "/assets/images/elorad/hero-2.png",
    },
    {
      id: "school",
      title: "Back to School",
      description: "Start the year with style and confidence",
      image: "/assets/images/elorad/hero-2.png",
    },
    {
      id: "creative",
      title: "Creative Play",
      description: "Inspire imagination and artistic expression",
      image: "/assets/images/elorad/hero-2.png",
    },
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  return (
    <section className="py-16 bg-gradient-to-b from-pale-blue to-white">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-palanquin mb-4">
            Discover Their Perfect Match
          </h2>
          <p className="text-slate-gray font-montserrat max-w-2xl mx-auto">
            From playful toys to stylish clothing, find everything they need for
            every age and stage.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-center mb-10">
          <div className="bg-gray-100 p-1 rounded-full flex">
            <button
              onClick={() => setViewMode("product")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                viewMode === "product"
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-slate-gray hover:bg-gray-200"
              }`}
            >
              Shop by Product
            </button>
            <button
              onClick={() => setViewMode("age")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                viewMode === "age"
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-slate-gray hover:bg-gray-200"
              }`}
            >
              Shop by Age
            </button>
          </div>
        </div>

        {/* Main Content - Conditional Rendering Based on View Mode */}
        {viewMode === "product" ? (
          /* Product Categories Grid */
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {productCategories.map((category) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <Link
                  href={`/categories/${category.id}${
                    activeAge !== "all" ? `?age=${activeAge}` : ""
                  }`}
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4 bg-white p-2 rounded-full">
                      {React.createElement(category.icon, {
                        size: 24,
                        className: "text-purple-600",
                      })}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2 font-palanquin">
                      {category.title}
                    </h3>
                    <p className="text-slate-gray text-sm mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center text-purple-600 font-medium text-sm">
                      <span>Explore Products</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Age-Based Categories */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ageRanges.slice(1).map((age, index) => (
              <motion.div
                key={age.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl overflow-hidden ${
                  index === 0 ? "md:col-span-2 h-80" : "h-64"
                }`}
              >
                <Link href={`/age/${age.id}`}>
                  <div className="absolute inset-0">
                    <Image
                      src={"/assets/images/elorad/hero-2.png"}
                      alt={age.label}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  </div>
                  <div className="relative h-full flex flex-col justify-end p-6 text-white">
                    <div className="bg-purple-600/80 text-white text-xs rounded-full px-3 py-1 w-fit mb-3">
                      {age.range}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{age.label}</h3>
                    <p className="text-white/80 mb-4">
                      Perfect products designed specifically for{" "}
                      {age.label.toLowerCase()}
                    </p>
                    <button className="bg-white text-purple-600 rounded-full px-6 py-2 w-fit font-medium hover:bg-purple-50 transition-colors">
                      Shop Collection
                    </button>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Featured Collections */}
        <div className="mt-20">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold font-palanquin">
              Featured Collections
            </h2>
            <Link
              href="/collections"
              className="text-purple-600 font-medium flex items-center hover:underline"
            >
              View All
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {featuredCollections.map((collection, index) => (
              <motion.div
                key={collection.id}
                variants={itemVariants}
                className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white"
              >
                <Link href={`/collections/${collection.id}`}>
                  <div className="relative h-52">
                    <Image
                      src={collection.image}
                      alt={collection.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2">
                      {collection.title}
                    </h3>
                    <p className="text-slate-gray text-sm mb-4">
                      {collection.description}
                    </p>
                    <button className="bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors">
                      Explore Collection
                    </button>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Interactive Floating Elements */}
        <div className="relative h-20 mt-16">
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0],
            }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute left-[10%] top-0 w-12 h-12 rounded-full bg-yellow-200 opacity-70"
          />
          <motion.div
            animate={{
              y: [0, 10, 0],
              rotate: [0, -5, 0],
            }}
            transition={{ repeat: Infinity, duration: 4, delay: 1 }}
            className="absolute right-[15%] top-5 w-8 h-8 rounded-lg bg-purple-200 opacity-70"
          />
          <motion.div
            animate={{
              y: [0, -8, 0],
              x: [0, 8, 0],
            }}
            transition={{ repeat: Infinity, duration: 5, delay: 0.5 }}
            className="absolute left-[40%] bottom-0 w-10 h-10 rounded-xl bg-teal-200 opacity-70"
          />
        </div>
      </Container>
    </section>
  )
}

export default CategoryNavigation
