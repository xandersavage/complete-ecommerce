"use client"

import React, { useState, useEffect } from "react"
import {
  Star,
  MessageSquare,
  ThumbsUp,
  Filter,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import Image from "next/image"
import { Button } from "@medusajs/ui"

type Review = {
  id: string
  user: {
    name: string
    avatar?: string
  }
  rating: number
  title: string
  content: string
  date: string
  helpful: number
  verified: boolean
  childAge?: string
  childSize?: string
  images?: string[]
  userHelpfulVote?: boolean
}

type ProductReviewsProps = {
  productId: string
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  // State for managing reviews and filters
  const [reviews, setReviews] = useState<Review[]>([])
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [expandedReview, setExpandedReview] = useState<string | null>(null)
  const [reviewStats, setReviewStats] = useState({
    average: 0,
    total: 0,
    distribution: [
      { rating: 5, count: 0, percentage: 0 },
      { rating: 4, count: 0, percentage: 0 },
      { rating: 3, count: 0, percentage: 0 },
      { rating: 2, count: 0, percentage: 0 },
      { rating: 1, count: 0, percentage: 0 },
    ],
  })

  // Fetch reviews data
  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true)
      try {
        // In a real implementation, this would be an API call
        // const response = await fetch(`/api/products/${productId}/reviews`)
        // const data = await response.json()

        // For demo purposes, we'll use mock data
        const mockReviews: Review[] = [
          {
            id: "r1",
            user: {
              name: "Sarah K.",
              avatar: "https://randomuser.me/api/portraits/women/44.jpg",
            },
            rating: 5,
            title: "Perfect fit and super comfortable!",
            content:
              "My daughter absolutely loves this outfit. The material is soft yet durable, and it's held up wonderfully through multiple washes. The sizing was accurate based on the chart. We'll definitely be ordering more items from this collection! I appreciate that the fabric is breathable and doesn't irritate her sensitive skin. The colors are vibrant even after washing, and the stitching is high quality.",
            date: "2023-10-15",
            helpful: 12,
            verified: true,
            childAge: "4 years",
            childSize: "4T",
            images: [
              "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60",
            ],
          },
          {
            id: "r2",
            user: {
              name: "Michael T.",
              avatar: "https://randomuser.me/api/portraits/men/32.jpg",
            },
            rating: 4,
            title: "Great quality, slightly large",
            content:
              "The quality of this product is excellent. My son loves the design and colors. I found it runs slightly large, so consider sizing down if your child is between sizes. Otherwise, very happy with this purchase.",
            date: "2023-09-28",
            helpful: 8,
            verified: true,
            childAge: "6 years",
            childSize: "Small",
          },
          {
            id: "r3",
            user: {
              name: "Emma R.",
            },
            rating: 5,
            title: "Durable and adorable!",
            content:
              "This has become my daughter's favorite outfit. She's worn it weekly for months, and it still looks brand new after many washes. The colors haven't faded at all. The material is soft but sturdy enough for playground adventures. Highly recommend!",
            date: "2023-11-02",
            helpful: 5,
            verified: true,
            childAge: "3 years",
            childSize: "3T",
          },
          {
            id: "r4",
            user: {
              name: "David L.",
              avatar: "https://randomuser.me/api/portraits/men/67.jpg",
            },
            rating: 3,
            title: "Nice design but sizing issues",
            content:
              "The design and quality are good, but the sizing was off for us. My son usually wears a size 5, but this was too small. Consider sizing up. The customer service was helpful with the exchange process though.",
            date: "2023-10-05",
            helpful: 3,
            verified: true,
            childAge: "5 years",
            childSize: "5",
          },
          {
            id: "r5",
            user: {
              name: "Jessica M.",
              avatar: "https://randomuser.me/api/portraits/women/79.jpg",
            },
            rating: 5,
            title: "Perfect for active kids!",
            content:
              "My twins are extremely active and these clothes have stood up to everything they've put them through. From climbing trees to spilling juice, these wash beautifully and stay looking new. The reinforced knees are a lifesaver!",
            date: "2023-09-18",
            helpful: 15,
            verified: true,
            childAge: "7 years",
            childSize: "Medium",
            images: [
              "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60",
            ],
          },
          {
            id: "r6",
            user: {
              name: "Robert K.",
            },
            rating: 1,
            title: "Disappointed with quality",
            content:
              "The stitching came apart after just two washes. Very disappointed with the quality for the price. Would not recommend.",
            date: "2023-08-22",
            helpful: 2,
            verified: true,
            childAge: "10 years",
            childSize: "Large",
          },
        ]

        setReviews(mockReviews)
        setFilteredReviews(mockReviews)

        // Calculate review statistics
        const total = mockReviews.length
        const sum = mockReviews.reduce((acc, review) => acc + review.rating, 0)
        const average = total > 0 ? parseFloat((sum / total).toFixed(1)) : 0

        // Calculate distribution
        const distribution = [5, 4, 3, 2, 1].map((rating) => {
          const count = mockReviews.filter((r) => r.rating === rating).length
          const percentage = total > 0 ? Math.round((count / total) * 100) : 0
          return { rating, count, percentage }
        })

        setReviewStats({
          average,
          total,
          distribution,
        })
      } catch (error) {
        console.error("Error fetching reviews:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchReviews()
  }, [productId])

  // Filter reviews based on active filter
  useEffect(() => {
    if (!activeFilter) {
      setFilteredReviews(reviews)
      return
    }

    if (activeFilter.startsWith("rating-")) {
      const rating = parseInt(activeFilter.split("-")[1])
      setFilteredReviews(reviews.filter((review) => review.rating === rating))
    } else if (activeFilter === "with-images") {
      setFilteredReviews(
        reviews.filter((review) => review.images && review.images.length > 0)
      )
    } else if (activeFilter === "verified") {
      setFilteredReviews(reviews.filter((review) => review.verified))
    } else if (activeFilter.startsWith("age-")) {
      const age = activeFilter.split("-")[1]
      setFilteredReviews(
        reviews.filter((review) => review.childAge?.includes(age))
      )
    }
  }, [activeFilter, reviews])

  // Toggle expanded review
  const toggleExpandReview = (reviewId: string) => {
    if (expandedReview === reviewId) {
      setExpandedReview(null)
    } else {
      setExpandedReview(reviewId)
    }
  }

  // Mark review as helpful
  const markReviewAsHelpful = (reviewId: string) => {
    setReviews(
      reviews.map((review) => {
        if (review.id === reviewId) {
          const userHelpfulVote = !review.userHelpfulVote
          return {
            ...review,
            helpful: userHelpfulVote ? review.helpful + 1 : review.helpful - 1,
            userHelpfulVote,
          }
        }
        return review
      })
    )
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  // Render star rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={`${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="w-full" id="product-reviews">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Customer Reviews
      </h2>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      ) : (
        <>
          {/* Review Stats Summary */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Average Rating */}
              <div className="flex flex-col items-center justify-center">
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  {reviewStats.average}
                </div>
                <div className="flex mb-1">
                  {renderStars(Math.round(reviewStats.average))}
                </div>
                <div className="text-sm text-gray-500">
                  Based on {reviewStats.total} reviews
                </div>
              </div>

              {/* Rating Distribution */}
              <div className="col-span-1 md:col-span-2">
                <div className="space-y-2">
                  {reviewStats.distribution.map((dist) => (
                    <div key={dist.rating} className="flex items-center">
                      <button
                        onClick={() =>
                          setActiveFilter(
                            activeFilter === `rating-${dist.rating}`
                              ? null
                              : `rating-${dist.rating}`
                          )
                        }
                        className={`flex items-center w-16 text-sm ${
                          activeFilter === `rating-${dist.rating}`
                            ? "font-semibold text-purple-600"
                            : "text-gray-600"
                        }`}
                      >
                        {dist.rating} star{dist.rating !== 1 ? "s" : ""}
                      </button>
                      <div className="flex-1 mx-3 h-2.5 rounded-full bg-gray-200 overflow-hidden">
                        <div
                          className="h-full bg-yellow-400 rounded-full"
                          style={{ width: `${dist.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500 w-14 text-right">
                        {dist.count} ({dist.percentage}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Filter Options */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex items-center text-sm font-medium text-gray-700 mr-2">
                  <Filter size={16} className="mr-1" /> Filter:
                </span>

                <button
                  onClick={() =>
                    setActiveFilter(
                      activeFilter === "with-images" ? null : "with-images"
                    )
                  }
                  className={`px-3 py-1 text-sm rounded-full ${
                    activeFilter === "with-images"
                      ? "bg-purple-100 text-purple-800 border border-purple-200"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  With Photos
                </button>

                <button
                  onClick={() =>
                    setActiveFilter(
                      activeFilter === "verified" ? null : "verified"
                    )
                  }
                  className={`px-3 py-1 text-sm rounded-full ${
                    activeFilter === "verified"
                      ? "bg-purple-100 text-purple-800 border border-purple-200"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Verified Purchases
                </button>

                <button
                  onClick={() =>
                    setActiveFilter(activeFilter === "age-3" ? null : "age-3")
                  }
                  className={`px-3 py-1 text-sm rounded-full ${
                    activeFilter === "age-3"
                      ? "bg-purple-100 text-purple-800 border border-purple-200"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Ages 2-4
                </button>

                <button
                  onClick={() =>
                    setActiveFilter(activeFilter === "age-5" ? null : "age-5")
                  }
                  className={`px-3 py-1 text-sm rounded-full ${
                    activeFilter === "age-5"
                      ? "bg-purple-100 text-purple-800 border border-purple-200"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Ages 5-7
                </button>

                {activeFilter && (
                  <button
                    onClick={() => setActiveFilter(null)}
                    className="px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:underline"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Customer Photos */}
          {reviews.some(
            (review) => review.images && review.images.length > 0
          ) && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Customer Photos
              </h3>
              <div className="flex overflow-x-auto gap-4 pb-4">
                {reviews
                  .filter((review) => review.images && review.images.length > 0)
                  .flatMap(
                    (review) =>
                      review.images?.map((image, idx) => (
                        <div
                          key={`${review.id}-${idx}`}
                          className="flex-shrink-0 relative w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden"
                        >
                          <Image
                            src={image}
                            alt={`Review by ${review.user.name}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 96px, 128px"
                          />
                        </div>
                      )) || []
                  )}
              </div>
            </div>
          )}

          {/* Reviews List */}
          {filteredReviews.length > 0 ? (
            <div className="space-y-6">
              {filteredReviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6">
                  <div className="flex items-start">
                    {/* User Avatar */}
                    <div className="mr-4">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                        {review.user.avatar ? (
                          <Image
                            src={review.user.avatar}
                            alt={review.user.name}
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        ) : (
                          <span className="text-gray-500 font-medium">
                            {review.user.name.charAt(0)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Review Content */}
                    <div className="flex-1">
                      {/* Review Header */}
                      <div className="flex flex-wrap items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center">
                            <span className="font-medium text-gray-900 mr-2">
                              {review.user.name}
                            </span>
                            {review.verified && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          <div className="flex items-center mt-1">
                            {renderStars(review.rating)}
                            <span className="ml-2 text-sm text-gray-500">
                              {formatDate(review.date)}
                            </span>
                          </div>
                        </div>

                        {/* Child Age/Size (if available) */}
                        {(review.childAge || review.childSize) && (
                          <div className="mt-1 text-sm text-gray-500">
                            {review.childAge && (
                              <span>Child Age: {review.childAge}</span>
                            )}
                            {review.childAge && review.childSize && (
                              <span> • </span>
                            )}
                            {review.childSize && (
                              <span>Size Purchased: {review.childSize}</span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Review Title */}
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {review.title}
                      </h4>

                      {/* Review Text */}
                      <div className="text-gray-700">
                        {review.content.length > 200 &&
                        expandedReview !== review.id ? (
                          <>
                            <p>{review.content.substring(0, 200)}...</p>
                            <button
                              onClick={() => toggleExpandReview(review.id)}
                              className="text-purple-600 hover:text-purple-800 text-sm font-medium mt-1 flex items-center"
                            >
                              Read more{" "}
                              <ChevronDown size={16} className="ml-1" />
                            </button>
                          </>
                        ) : (
                          <>
                            <p>{review.content}</p>
                            {review.content.length > 200 && (
                              <button
                                onClick={() => toggleExpandReview(review.id)}
                                className="text-purple-600 hover:text-purple-800 text-sm font-medium mt-1 flex items-center"
                              >
                                Show less{" "}
                                <ChevronUp size={16} className="ml-1" />
                              </button>
                            )}
                          </>
                        )}
                      </div>

                      {/* Review Images */}
                      {review.images && review.images.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {review.images.map((image, idx) => (
                            <div
                              key={idx}
                              className="relative w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden"
                            >
                              <Image
                                src={image}
                                alt={`Image ${idx + 1} from ${
                                  review.user.name
                                }`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 64px, 80px"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Review Actions */}
                      <div className="mt-4 flex items-center">
                        <button
                          onClick={() => markReviewAsHelpful(review.id)}
                          className={`flex items-center text-sm ${
                            review.userHelpfulVote
                              ? "text-purple-600 font-medium"
                              : "text-gray-500 hover:text-gray-700"
                          }`}
                        >
                          <ThumbsUp size={16} className="mr-1" />
                          Helpful ({review.helpful})
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <MessageSquare size={32} className="mx-auto text-gray-400 mb-2" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No reviews match your filters
              </h3>
              <p className="text-gray-500">
                Try adjusting your filters or check back later
              </p>
              {activeFilter && (
                <button
                  onClick={() => setActiveFilter(null)}
                  className="mt-4 text-purple-600 hover:text-purple-800 font-medium"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}

          {/* Write Review CTA */}
          <div className="mt-10 bg-purple-50 rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-purple-900 mb-2">
              Share Your Experience
            </h3>
            <p className="text-purple-700 mb-4">
              Help other parents by sharing your thoughts on this product
            </p>
            <Button
              variant="primary"
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => {
                // Implement review submission functionality
                console.log("Write review clicked")
              }}
            >
              Write a Review
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default ProductReviews
