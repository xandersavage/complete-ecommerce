"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

// Define your categories
const categories = [
  {
    id: "babies",
    name: "Babies",
    href: "/collections/babies",
    image: "/assets/images/category-babies.jpg", // Replace with your image paths
    ageRange: "0-24 months",
  },
  {
    id: "toddlers",
    name: "Toddlers",
    href: "/collections/toddlers",
    image: "/assets/images/category-toddlers.jpg",
    ageRange: "2-4 years",
  },
  {
    id: "kids",
    name: "Kids",
    href: "/collections/kids",
    image: "/assets/images/category-kids.jpg",
    ageRange: "5-8 years",
  },
  {
    id: "pre-teens",
    name: "Pre-Teens",
    href: "/collections/pre-teens",
    image: "/assets/images/category-preteens.jpg",
    ageRange: "9-12 years",
  },
  {
    id: "teens",
    name: "Teens",
    href: "/collections/teens",
    image: "/assets/images/category-teens.jpg",
    ageRange: "13+ years",
  },
]

const CategoryNavigation = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6 font-palanquin">
        Shop by Age
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <LocalizedClientLink href={category.href} className="block group">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-lg font-bold">{category.name}</h3>
                  <p className="text-sm opacity-90">{category.ageRange}</p>
                </div>
              </div>
            </LocalizedClientLink>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default CategoryNavigation
