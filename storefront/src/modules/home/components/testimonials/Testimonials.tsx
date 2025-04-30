// @modules/home/components/Testimonials/Testimonials.tsx
"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Container from "@modules/layout/templates/container"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import Image from "next/image"

// Define testimonial data structure
interface Testimonial {
  id: string
  name: string
  role: string
  rating: number
  text: string
  productName?: string
  productLink?: string
  verified: boolean
  avatar?: string
  date: string
}

const Testimonials: React.FC = () => {
  // State for active testimonial in mobile view
  const [activeIndex, setActiveIndex] = useState(0)
  // State for desktop carousel position
  const [carouselPosition, setCarouselPosition] = useState(0)
  // State for viewport width tracking
  const [viewportWidth, setViewportWidth] = useState(0)

  // Refs for DOM elements
  const carouselRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Sample testimonial data (in a real app, this would come from an API)
  const testimonials: Testimonial[] = [
    {
      id: "t1",
      name: "Sarah K.",
      role: "Parent of two",
      rating: 5,
      text: "The quality of Elorad's clothing has exceeded my expectations. After countless washes, the colors remain vibrant and the fabric hasn't pilled at all. My 7-year-old is rough on clothes, but these have stood up to playground adventures, art projects, and everything in between!",
      productName: "Adventure Ready Set",
      productLink: "/products/adventure-ready-set",
      verified: true,
      avatar: "/assets/images/testimonials/avatar1.jpg",
      date: "2023-09-15",
    },
    {
      id: "t2",
      name: "Michael T.",
      role: "Dad of a toddler",
      rating: 5,
      text: "I was hesitant about ordering clothes online for my 3-year-old, but Elorad's sizing guide was spot on. The materials are so soft, and my little one actually gets excited to wear them! The reinforced knees have been a lifesaver for our active crawler.",
      productName: "Toddler Essentials Bundle",
      productLink: "/products/toddler-essentials",
      verified: true,
      avatar: "/assets/images/testimonials/avatar2.jpg",
      date: "2023-10-02",
    },
    {
      id: "t3",
      name: "Jessica M.",
      role: "Mom of three",
      rating: 4,
      text: "Finding age-appropriate clothes for my pre-teen daughter has been a challenge until I discovered Elorad. The styles are trendy yet modest, and she loves how comfortable everything is. The only reason for 4 stars instead of 5 is that I wish there were more color options!",
      productName: "Pre-Teen Collection",
      productLink: "/products/preteen-collection",
      verified: true,
      avatar: "/assets/images/testimonials/avatar3.jpg",
      date: "2023-08-21",
    },
    {
      id: "t4",
      name: "David L.",
      role: "Uncle",
      rating: 5,
      text: "Ordered a gift for my niece and was impressed by the packaging and quality. The customer service was exceptional when I needed to exchange for a different size. The team made it completely hassle-free. Will definitely be my go-to for future gifts!",
      verified: true,
      avatar: "/assets/images/testimonials/avatar4.jpg",
      date: "2023-11-05",
    },
    {
      id: "t5",
      name: "Emma R.",
      role: "Parent of teen",
      rating: 5,
      text: "My 14-year-old is very particular about his style, but the Teen Streetwear Collection was a huge hit. The materials are high-quality and the designs are actually cool enough to pass his strict standards. The sustainable aspects of the brand are a big plus for us too.",
      productName: "Teen Streetwear Collection",
      productLink: "/products/teen-streetwear",
      verified: true,
      avatar: "/assets/images/testimonials/avatar5.jpg",
      date: "2023-10-18",
    },
  ]

  // Calculate testimonials to show based on viewport width
  const getVisibleCount = () => {
    if (viewportWidth < 640) return 1 // Mobile
    if (viewportWidth < 1024) return 2 // Tablet
    return 3 // Desktop
  }

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth)
    }

    // Set initial width
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Navigation functions
  const goToNext = () => {
    const visibleCount = getVisibleCount()
    const maxPosition = Math.max(0, testimonials.length - visibleCount)

    if (carouselPosition < maxPosition) {
      setCarouselPosition(carouselPosition + 1)
    } else {
      // Loop back to start
      setCarouselPosition(0)
    }

    // For mobile view
    setActiveIndex((activeIndex + 1) % testimonials.length)
  }

  const goToPrev = () => {
    const visibleCount = getVisibleCount()
    const maxPosition = Math.max(0, testimonials.length - visibleCount)

    if (carouselPosition > 0) {
      setCarouselPosition(carouselPosition - 1)
    } else {
      // Loop to end
      setCarouselPosition(maxPosition)
    }

    // For mobile view
    setActiveIndex(
      activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1
    )
  }

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext()
    }, 6000) // Rotate every 6 seconds

    return () => clearInterval(interval)
  }, [carouselPosition, activeIndex])

  // Generate star rating component
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`${
              i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    )
  }

  // Calculate item width based on container and visible count
  const getItemWidth = () => {
    if (!containerRef.current) return 100
    const containerWidth = containerRef.current.clientWidth
    const visibleCount = getVisibleCount()
    const gap = 24 // gap-6 = 24px

    return (containerWidth - gap * (visibleCount - 1)) / visibleCount
  }

  return (
    <section className="py-16 bg-gradient-to-b from-pale-blue to-white overflow-hidden">
      <Container>
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-purple-600 font-medium text-sm uppercase tracking-wider mb-2 block"
          >
            What Parents Are Saying
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold font-palanquin mb-4"
          >
            Stories from <span className="text-purple-600">Happy Families</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-gray max-w-2xl mx-auto font-montserrat"
          >
            Join thousands of satisfied parents who have discovered the perfect
            clothing and accessories for their children.
          </motion.p>
        </div>

        {/* Mobile Testimonial Slider (visible on small screens) */}
        <div className="block sm:hidden">
          <div className="relative px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl p-6 shadow-md"
              >
                <Quote className="text-purple-200 w-10 h-10 mb-4" />
                {renderStars(testimonials[activeIndex].rating)}
                <p className="text-slate-700 italic mb-6 font-montserrat">
                  &quot;{testimonials[activeIndex].text}&quot;
                </p>
                <div className="flex items-center">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 mr-4">
                    {testimonials[activeIndex].avatar && (
                      <Image
                        src={testimonials[activeIndex].avatar}
                        alt={testimonials[activeIndex].name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">
                      {testimonials[activeIndex].name}
                    </p>
                    <p className="text-sm text-slate-500">
                      {testimonials[activeIndex].role}
                    </p>
                  </div>
                </div>
                {testimonials[activeIndex].productName && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-slate-500">
                      Purchased:{" "}
                      <a
                        href={testimonials[activeIndex].productLink}
                        className="text-purple-600 hover:underline"
                      >
                        {testimonials[activeIndex].productName}
                      </a>
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-6 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeIndex
                      ? "bg-purple-600 w-6"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop/Tablet Testimonial Carousel */}
        <div className="hidden sm:block" ref={containerRef}>
          <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden" ref={carouselRef}>
              <motion.div
                className="flex gap-6"
                animate={{
                  x: -carouselPosition * (getItemWidth() + 24), // width + gap
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {testimonials.map((testimonial) => (
                  <motion.div
                    key={testimonial.id}
                    style={{ width: getItemWidth() }}
                    className="flex-shrink-0 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
                    whileHover={{ y: -5 }}
                  >
                    <Quote className="text-purple-200 w-10 h-10 mb-4" />
                    {renderStars(testimonial.rating)}
                    <p className="text-slate-700 italic mb-6 font-montserrat flex-grow">
                      &quot;{testimonial.text}&quot;
                    </p>
                    <div className="flex items-center mt-auto">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 mr-4 flex-shrink-0">
                        {testimonial.avatar && (
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <p className="font-bold text-slate-800">
                            {testimonial.name}
                          </p>
                          {testimonial.verified && (
                            <span className="ml-2 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                              Verified
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-500">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    {testimonial.productName && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-sm text-slate-500">
                          Purchased:{" "}
                          <a
                            href={testimonial.productLink}
                            className="text-purple-600 hover:underline"
                          >
                            {testimonial.productName}
                          </a>
                        </p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all hover:bg-purple-50 z-10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5 text-slate-700" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all hover:bg-purple-50 z-10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5 text-slate-700" />
            </button>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({
                length: Math.ceil(testimonials.length - getVisibleCount() + 1),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCarouselPosition(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === carouselPosition
                      ? "bg-purple-600 w-6"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial set ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Overall Rating Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-white rounded-xl p-8 shadow-md flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">4.9</div>
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={`${
                    i < 4 || i === 4
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-yellow-400 fill-yellow-400"
                  }`}
                />
              ))}
            </div>
            <p className="text-slate-600 text-sm">Average Rating</p>
          </div>

          <div className="h-16 w-px bg-gray-200 hidden md:block"></div>

          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">
              2,500+
            </div>
            <p className="text-slate-600 text-sm">Happy Customers</p>
          </div>

          <div className="h-16 w-px bg-gray-200 hidden md:block"></div>

          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">98%</div>
            <p className="text-slate-600 text-sm">Recommend Us</p>
          </div>
        </motion.div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <a
            href="/reviews"
            className="inline-flex items-center text-purple-600 font-medium hover:text-purple-700 transition-colors"
          >
            Read All Reviews
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </Container>
    </section>
  )
}

export default Testimonials
