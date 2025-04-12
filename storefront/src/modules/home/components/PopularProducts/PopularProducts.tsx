"use client"

import { motion } from "framer-motion"
import { products } from "../../../../../public/constants"
import PopularProductCard from "../PopularProductCard/PopularProductCard"

const PopularProducts = () => {
  return (
    <section id="popular-products" className="max-container max-sm:mt-12">
      <div className="flex flex-col justify-start gap-5">
        <h2 className="text-4xl font-palanquin font-bold">
          Our <span className="text-coral-red">Popular</span> Products
        </h2>
        <p className="lg:max-w-lg mt-2 font-montserrat text-slate-gray">
          Experience top-notch quality and style with our sought-after
          selections. Discover a world of comfort, design and value
        </p>
      </div>

      <div className="mt-16 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-4 gap-14">
        {products.map((product) => (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            // animate={{ x: 100 }}
            transition={{ ease: "easeOut" }}
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 1.5 } }}
            viewport={{ once: true }}
          >
            <PopularProductCard key={product.name} {...product} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default PopularProducts
