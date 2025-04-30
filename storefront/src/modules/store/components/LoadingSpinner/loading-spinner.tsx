"use client"

import { motion } from "framer-motion"

type LoadingSpinnerProps = {
  size?: "small" | "medium" | "large"
  color?: "purple" | "gray" | "white"
}

const LoadingSpinner = ({
  size = "medium",
  color = "purple",
}: LoadingSpinnerProps) => {
  // Size mappings
  const sizeMap = {
    small: "w-6 h-6 border-2",
    medium: "w-10 h-10 border-2",
    large: "w-16 h-16 border-3",
  }

  // Color mappings
  const colorMap = {
    purple: "border-purple-200 border-t-purple-600",
    gray: "border-gray-200 border-t-gray-600",
    white: "border-white/30 border-t-white",
  }

  return (
    <motion.div
      className={`rounded-full ${sizeMap[size]} ${colorMap[color]} animate-spin`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )
}

export default LoadingSpinner
