// @modules/home/components/ValueProposition/ValueProposition.tsx
"use client"

import React, { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import Container from "@modules/layout/templates/container"
import { Shield, Leaf, Heart, Award, CheckCircle } from "lucide-react"

const ValueProposition = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  // Value proposition data
  const valueProps = [
    {
      id: "safety",
      icon: Shield,
      title: "Child-Safe Materials",
      description:
        "All our products undergo rigorous safety testing and are made with non-toxic, child-friendly materials that meet or exceed safety standards.",
      color: "bg-purple-100 text-purple-600",
      features: ["Non-toxic dyes", "Allergen tested", "Safety certified"],
    },
    {
      id: "quality",
      icon: Award,
      title: "Built to Last",
      description:
        "Durable construction and premium materials ensure our products withstand the active lifestyles of growing children.",
      color: "bg-blue-100 text-blue-600",
      features: ["Reinforced stitching", "Fade-resistant", "Machine washable"],
    },
    {
      id: "comfort",
      icon: Heart,
      title: "Comfort First Design",
      description:
        "Soft fabrics and ergonomic designs provide maximum comfort for all-day wear and play.",
      color: "bg-pink-100 text-pink-600",
      features: ["Soft-touch fabrics", "No irritating tags", "Flexible fit"],
    },
    {
      id: "eco",
      icon: Leaf,
      title: "Eco-Conscious Choice",
      description:
        "Sustainable materials and ethical manufacturing practices reduce environmental impact without compromising on quality.",
      color: "bg-green-100 text-green-600",
      features: ["Organic options", "Reduced packaging", "Ethical production"],
    },
  ]

  return (
    <section
      className="py-16 bg-white overflow-hidden"
      aria-labelledby="value-proposition-title"
    >
      <Container>
        <div className="text-center mb-12">
          <motion.h2
            id="value-proposition-title"
            className="text-3xl md:text-4xl font-bold font-palanquin mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Why Parents <span className="text-purple-600">Trust Us</span>
          </motion.h2>
          <motion.p
            className="text-slate-gray max-w-2xl mx-auto font-montserrat"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We believe children deserve the best. That&apos;s why every Elorad
            product is designed with care, quality, and safety in mind.
          </motion.p>
        </div>

        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4"
        >
          {valueProps.map((prop) => (
            <motion.div
              key={prop.id}
              variants={itemVariants}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              <div
                className={`w-12 h-12 rounded-full ${prop.color} flex items-center justify-center mb-4`}
              >
                <prop.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-palanquin mb-3">
                {prop.title}
              </h3>
              <p className="text-slate-gray mb-4 font-montserrat text-sm">
                {prop.description}
              </p>
              <ul className="space-y-2">
                {prop.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center text-sm font-montserrat"
                  >
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 pt-8 border-t border-gray-100"
        >
          <div className="text-center mb-6">
            <h3 className="text-lg font-medium font-palanquin mb-1">
              Trusted Standards
            </h3>
            <p className="text-slate-gray text-sm font-montserrat">
              Our products meet or exceed these industry standards
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {/* Replace these with actual certification logos */}
            {["GOTS Certified", "OEKO-TEX", "Fair Trade", "CPSC Compliant"].map(
              (cert, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center h-12 px-4 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                >
                  <div className="bg-gray-200 rounded-lg px-4 py-2 text-gray-600 font-medium">
                    {cert}
                  </div>
                </div>
              )
            )}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 bg-purple-50 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold font-palanquin mb-3">
            Experience the Elorad Difference
          </h3>
          <p className="text-slate-gray mb-6 max-w-2xl mx-auto font-montserrat">
            Join thousands of parents who&apos;ve chosen quality, safety, and
            style for their children.
          </p>
          <a
            href="/collections"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-8 rounded-full transition-colors duration-300"
          >
            Shop Our Collections
          </a>
        </motion.div>
      </Container>
    </section>
  )
}

export default ValueProposition
