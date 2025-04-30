"use client"

import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const mainImageRef = useRef<HTMLDivElement>(null)

  // No images case
  if (!images.length) {
    return (
      <div className="w-full aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-400">No images available</p>
      </div>
    )
  }

  // Handle thumbnail click
  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index)
    setIsZoomed(false)
  }

  // Handle main image navigation
  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    setIsZoomed(false)
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    setIsZoomed(false)
  }

  // Handle zoom functionality
  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !mainImageRef.current) return

    const { left, top, width, height } =
      mainImageRef.current.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100

    setZoomPosition({ x, y })
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrevious()
      } else if (e.key === "ArrowRight") {
        handleNext()
      } else if (e.key === "Escape") {
        setIsZoomed(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Main Image Container */}
      <div
        className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-lg mb-4"
        ref={mainImageRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setIsZoomed(false)}
      >
        {/* Main Image */}
        <div
          className={`relative w-full h-full cursor-${
            isZoomed ? "zoom-out" : "zoom-in"
          } transition-all duration-300`}
          onClick={handleZoomToggle}
        >
          {images[activeIndex]?.url && (
            <Image
              src={images[activeIndex].url}
              priority={true}
              className={`
                w-full h-full object-contain transition-transform duration-300
                ${isZoomed ? "scale-150" : "scale-100"}
              `}
              alt={`Product image ${activeIndex + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              style={
                isZoomed
                  ? {
                      transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    }
                  : undefined
              }
            />
          )}
        </div>

        {/* Zoom indicator */}
        <button
          className="absolute top-4 right-4 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
          onClick={handleZoomToggle}
          aria-label={isZoomed ? "Zoom out" : "Zoom in"}
        >
          <ZoomIn size={20} className="text-gray-700" />
        </button>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
              onClick={handlePrevious}
              aria-label="Previous image"
            >
              <ChevronLeft size={20} className="text-gray-700" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
              onClick={handleNext}
              aria-label="Next image"
            >
              <ChevronRight size={20} className="text-gray-700" />
            </button>
          </>
        )}

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-4 bg-white/80 px-2 py-1 rounded-md text-xs font-medium text-gray-700">
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex flex-wrap gap-2 justify-center">
          {images.map((image, index) => (
            <button
              key={image.id}
              className={`
                relative w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden transition-all
                ${
                  activeIndex === index
                    ? "ring-2 ring-purple-600 ring-offset-2"
                    : "ring-1 ring-gray-200 hover:ring-gray-300"
                }
              `}
              onClick={() => handleThumbnailClick(index)}
              aria-label={`View image ${index + 1}`}
              aria-current={activeIndex === index ? "true" : "false"}
            >
              {image.url && (
                <Image
                  src={image.url}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageGallery
