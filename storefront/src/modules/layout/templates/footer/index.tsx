// @modules/layout/components/footer/Footer.tsx
"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Container from "@modules/layout/templates/container"

import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  MapPin,
  Phone,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

// Type definitions for footer links
interface FooterLink {
  label: string
  href: string
  isExternal?: boolean
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

const Footer: React.FC = () => {
  // State for mobile accordion sections
  const [openSection, setOpenSection] = useState<string | null>(null)

  // Toggle accordion section on mobile
  const toggleSection = (title: string) => {
    setOpenSection(openSection === title ? null : title)
  }

  // Footer navigation sections
  const footerSections: FooterSection[] = [
    {
      title: "Shop",
      links: [
        { label: "New Arrivals", href: "/collections/new-arrivals" },
        { label: "Best Sellers", href: "/collections/best-sellers" },
        { label: "Shop by Age", href: "/collections/shop-by-age" },
        { label: "Clothing", href: "/collections/clothing" },
        { label: "Accessories", href: "/collections/accessories" },
        { label: "Sale", href: "/collections/sale" },
      ],
    },
    {
      title: "Information",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Sustainability", href: "/sustainability" },
        { label: "Store Locations", href: "/stores" },
        { label: "Careers", href: "/careers" },
        { label: "Affiliate Program", href: "/affiliates" },
      ],
    },
    {
      title: "Customer Service",
      links: [
        { label: "Contact Us", href: "/contact" },
        { label: "FAQs", href: "/faqs" },
        { label: "Shipping & Returns", href: "/shipping-returns" },
        { label: "Size Guide", href: "/size-guide" },
        { label: "Track Order", href: "/track-order" },
      ],
    },
  ]

  // Social media links
  const socialLinks = [
    {
      icon: Facebook,
      href: "https://facebook.com/eloradkids",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/eloradkids",
      label: "Instagram",
    },
    { icon: Twitter, href: "https://twitter.com/eloradkids", label: "Twitter" },
    { icon: Youtube, href: "https://youtube.com/eloradkids", label: "YouTube" },
  ]

  // Payment methods
  const paymentMethods = [
    "Visa",
    "Mastercard",
    "American Express",
    "PayPal",
    "Apple Pay",
    "Google Pay",
  ]

  return (
    <footer
      className="bg-slate-800 text-white pt-12 pb-6"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-8 border-b border-slate-700">
          {/* Company Information */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <Link
                href="/"
                className="text-white font-bold text-2xl font-palanquin"
              >
                Elorad
              </Link>
            </div>

            <p className="text-slate-300 mb-6 font-montserrat text-sm max-w-xs">
              Elorad offers high-quality, stylish, and sustainable clothing and
              accessories for children and teens that grow with them through
              every adventure.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-slate-300 text-sm">
                  123 Fashion Avenue, Suite 200
                  <br />
                  New York, NY 10001
                </p>
              </div>

              <div className="flex items-center">
                <Phone className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0" />
                <a
                  href="tel:+18005551234"
                  className="text-slate-300 text-sm hover:text-white transition-colors"
                >
                  1-800-555-1234
                </a>
              </div>

              <div className="flex items-center">
                <Mail className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0" />
                <a
                  href="mailto:hello@elorad.com"
                  className="text-slate-300 text-sm hover:text-white transition-colors"
                >
                  hello@elorad.com
                </a>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex space-x-4 mb-8">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="bg-slate-700 p-2 rounded-full hover:bg-purple-600 transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections - Desktop */}
          <div className="hidden lg:flex lg:col-span-3 lg:justify-between w-full">
            {footerSections.map((section) => (
              <div key={section.title} className="flex flex-col">
                <h3 className="text-sm font-bold tracking-wider uppercase text-white mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-slate-300 text-sm hover:text-white transition-colors"
                        {...(link.isExternal
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Footer Sections - Mobile Accordion */}
          <div className="lg:hidden col-span-1 md:col-span-2 space-y-4">
            {footerSections.map((section) => (
              <div
                key={section.title}
                className="border-b border-slate-700 pb-4"
              >
                <button
                  onClick={() => toggleSection(section.title)}
                  className="flex justify-between items-center w-full py-2 text-left"
                  aria-expanded={openSection === section.title}
                >
                  <h3 className="text-sm font-bold tracking-wider uppercase text-white">
                    {section.title}
                  </h3>
                  {openSection === section.title ? (
                    <ChevronUp className="h-4 w-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  )}
                </button>

                {openSection === section.title && (
                  <ul className="mt-3 space-y-3 pl-2">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-slate-300 text-sm hover:text-white transition-colors"
                          {...(link.isExternal
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Callout */}
        <div className="py-8 border-b border-slate-700">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold mb-1">Join our newsletter</h3>
              <p className="text-slate-300 text-sm">
                Get updates on new arrivals and special offers
              </p>
            </div>
            <Link
              href="/#newsletter"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full transition-colors text-sm font-medium flex-shrink-0"
            >
              Subscribe Now
            </Link>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="pt-8 pb-4">
          <h3 className="text-sm font-medium mb-4 text-center">
            Accepted Payment Methods
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {paymentMethods.map((method) => (
              <div
                key={method}
                className="bg-slate-700 px-3 py-2 rounded text-xs text-slate-300"
              >
                {method}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-8 pt-8 border-t border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-400 text-sm">
              © {new Date().getFullYear()} Elorad. All rights reserved.
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
              <Link
                href="/privacy-policy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/accessibility"
                className="hover:text-white transition-colors"
              >
                Accessibility
              </Link>
              <Link
                href="/cookie-policy"
                className="hover:text-white transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>

          {/* Trust and Security */}
          <div className="mt-6 text-center text-xs text-slate-500">
            <p>
              Elorad is committed to child safety and ethical manufacturing
              practices.
            </p>
            <p className="mt-2">
              All products comply with CPSC guidelines and are regularly tested
              for quality and safety.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
