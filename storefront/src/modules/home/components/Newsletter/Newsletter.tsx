// @modules/home/components/Newsletter/Newsletter.tsx
"use client"

import React, { useState, useRef } from "react"
import { motion } from "framer-motion"
import Container from "@modules/layout/templates/container"
import { Send, CheckCircle, AlertCircle } from "lucide-react"

// Form submission status types
type SubmissionStatus = "idle" | "loading" | "success" | "error"

const Newsletter: React.FC = () => {
  // Form state management
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<SubmissionStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string | null>(null)

  // Refs for form elements
  const formRef = useRef<HTMLFormElement>(null)
  const emailInputRef = useRef<HTMLInputElement>(null)

  // Age group options for targeted content
  const ageGroups = [
    { id: "babies", label: "0-2 Years" },
    { id: "toddlers", label: "3-5 Years" },
    { id: "kids", label: "6-9 Years" },
    { id: "preteens", label: "10-12 Years" },
    { id: "teens", label: "13+ Years" },
  ]

  // Email validation function
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Form submission handler with debounce to prevent multiple submissions
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Don't proceed if already submitting
    if (status === "loading") return

    // Reset previous error messages
    setErrorMessage("")

    // Validate email format
    if (!email.trim()) {
      setErrorMessage("Please enter your email address")
      emailInputRef.current?.focus()
      return
    }

    if (!isValidEmail(email)) {
      setErrorMessage("Please enter a valid email address")
      emailInputRef.current?.focus()
      return
    }

    // Set loading state
    setStatus("loading")

    try {
      // In a real implementation, this would be an API call
      // const response = await fetch("/api/newsletter/subscribe", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, ageGroup: selectedAgeGroup }),
      // });

      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate successful response
      // if (!response.ok) throw new Error("Subscription failed");

      // Success state
      setStatus("success")
      setEmail("")
      setSelectedAgeGroup(null)

      // Reset form after 5 seconds
      setTimeout(() => {
        setStatus("idle")
      }, 5000)
    } catch (error) {
      // Error handling
      console.error("Newsletter submission error:", error)
      setStatus("error")
      setErrorMessage("Something went wrong. Please try again later.")

      // Reset error state after 5 seconds
      setTimeout(() => {
        setStatus("idle")
      }, 5000)
    }
  }

  return (
    <section className="py-16 bg-purple-50 overflow-hidden">
      <Container>
        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-100 rounded-full opacity-50 blur-3xl"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-100 rounded-full opacity-50 blur-3xl"></div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="grid md:grid-cols-2 gap-0">
                {/* Left column: Image */}
                <div className="bg-purple-600 p-8 text-white flex flex-col justify-center relative overflow-hidden">
                  {/* Decorative patterns */}
                  <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="absolute top-5 left-5 w-20 h-20 border-2 border-white rounded-full"></div>
                    <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-white rounded-full"></div>
                    <div className="absolute top-1/4 right-1/4 w-16 h-16 border-2 border-white rounded-full"></div>
                  </div>

                  <div className="relative z-10">
                    <h2 className="text-2xl md:text-3xl font-bold font-palanquin mb-4">
                      Stay in the Loop
                    </h2>
                    <p className="text-purple-100 mb-6 font-montserrat">
                      Join our newsletter for exclusive offers, new arrivals,
                      and age-appropriate recommendations as your child grows.
                    </p>

                    <ul className="space-y-2 mb-6">
                      {[
                        "Early access to new collections",
                        "Exclusive subscriber discounts",
                        "Seasonal style guides",
                        "Parenting tips and advice",
                      ].map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-purple-200" />
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="text-sm text-purple-200 italic">
                      &quot;Our newsletter has saved me so much time finding the
                      right clothes as my kids grow!&quot;
                      <br />
                      <span className="font-medium text-white mt-1 block">
                        — Jessica, mom of two
                      </span>
                    </p>
                  </div>
                </div>

                {/* Right column: Form */}
                <div className="p-8 md:p-10">
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-bold font-palanquin mb-2">
                        Subscribe to Our Newsletter
                      </h3>
                      <p className="text-slate-500 text-sm mb-6 font-montserrat">
                        Get updates on new arrivals and special offers tailored
                        to your child&apos;s age.
                      </p>
                    </div>

                    {/* Email input */}
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-slate-700"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        ref={emailInputRef}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errorMessage
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors`}
                        disabled={status === "loading" || status === "success"}
                        aria-invalid={!!errorMessage}
                        aria-describedby={
                          errorMessage ? "email-error" : undefined
                        }
                      />
                      {errorMessage && (
                        <p
                          id="email-error"
                          className="text-red-500 text-sm flex items-center"
                        >
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errorMessage}
                        </p>
                      )}
                    </div>

                    {/* Age group selection */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700">
                        Child&apos;s Age Range (Optional)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {ageGroups.map((age) => (
                          <button
                            key={age.id}
                            type="button"
                            onClick={() => setSelectedAgeGroup(age.id)}
                            className={`px-3 py-2 rounded-full text-sm transition-colors ${
                              selectedAgeGroup === age.id
                                ? "bg-purple-600 text-white"
                                : "bg-gray-100 text-slate-700 hover:bg-gray-200"
                            }`}
                            disabled={
                              status === "loading" || status === "success"
                            }
                          >
                            {age.label}
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-slate-500 mt-2">
                        Helps us send you age-appropriate recommendations
                      </p>
                    </div>

                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={status === "loading" || status === "success"}
                      className={`w-full py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center ${
                        status === "loading"
                          ? "bg-purple-400 text-white cursor-wait"
                          : status === "success"
                          ? "bg-green-600 text-white"
                          : "bg-purple-600 hover:bg-purple-700 text-white"
                      }`}
                    >
                      {status === "loading" ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Subscribing...
                        </>
                      ) : status === "success" ? (
                        <>
                          <CheckCircle className="h-5 w-5 mr-2" />
                          Subscribed!
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Subscribe
                        </>
                      )}
                    </button>

                    {/* Status messages */}
                    {status === "error" && (
                      <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm flex items-center">
                        <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                        <span>
                          {errorMessage ||
                            "Something went wrong. Please try again."}
                        </span>
                      </div>
                    )}

                    {status === "success" && (
                      <div className="p-3 bg-green-50 border border-green-100 text-green-600 rounded-lg text-sm flex items-center">
                        <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                        <span>
                          Thank you for subscribing! Check your inbox for a
                          confirmation email.
                        </span>
                      </div>
                    )}

                    {/* Privacy policy */}
                    <p className="text-xs text-slate-500 mt-4">
                      By subscribing, you agree to our{" "}
                      <a
                        href="/privacy-policy"
                        className="text-purple-600 hover:underline"
                      >
                        Privacy Policy
                      </a>
                      . We respect your privacy and will never share your
                      information.
                    </p>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Newsletter
