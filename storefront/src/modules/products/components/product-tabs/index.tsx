"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"
import { Tab } from "@headlessui/react"
import { useState } from "react"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const [selectedTab, setSelectedTab] = useState(0)

  const tabs = [
    {
      label: "Product Details",
      component: <ProductInfoTab product={product} />,
    },
    {
      label: "Size Guide",
      component: <SizeGuideTab />,
    },
    {
      label: "Shipping & Returns",
      component: <ShippingInfoTab />,
    },
    {
      label: "Care Instructions",
      component: <CareInstructionsTab product={product} />,
    },
  ]

  return (
    <div className="w-full" id="product-tabs">
      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className="flex space-x-1 rounded-xl bg-purple-50 p-1">
          {tabs.map((tab, idx) => (
            <Tab
              key={idx}
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-purple-700
                ring-white ring-opacity-60 ring-offset-2 ring-offset-purple-400 focus:outline-none focus:ring-2
                ${
                  selected
                    ? "bg-white shadow"
                    : "text-purple-400 hover:bg-white/[0.12] hover:text-purple-600"
                }`
              }
            >
              {tab.label}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-4">
          {tabs.map((tab, idx) => (
            <Tab.Panel
              key={idx}
              className={`rounded-xl bg-white p-4
                ring-white ring-opacity-60 ring-offset-2 ring-offset-purple-400 focus:outline-none focus:ring-2`}
            >
              {tab.component}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>

      {/* Mobile Accordion View */}
      <div className="md:hidden mt-6">
        <Accordion type="multiple">
          {tabs.map((tab, i) => (
            <Accordion.Item
              key={i}
              title={tab.label}
              headingSize="medium"
              value={tab.label}
            >
              {tab.component}
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="text-sm py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold text-gray-900">Material</span>
            <p className="text-gray-600">
              {product.material ? product.material : "-"}
            </p>
          </div>
          <div>
            <span className="font-semibold text-gray-900">
              Country of origin
            </span>
            <p className="text-gray-600">
              {product.origin_country ? product.origin_country : "-"}
            </p>
          </div>
          <div>
            <span className="font-semibold text-gray-900">Type</span>
            <p className="text-gray-600">
              {product.type ? product.type.value : "-"}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold text-gray-900">Weight</span>
            <p className="text-gray-600">
              {product.weight ? `${product.weight} g` : "-"}
            </p>
          </div>
          <div>
            <span className="font-semibold text-gray-900">Dimensions</span>
            <p className="text-gray-600">
              {product.length && product.width && product.height
                ? `${product.length}L x ${product.width}W x ${product.height}H`
                : "-"}
            </p>
          </div>
          <div>
            <span className="font-semibold text-gray-900">
              Safety Certifications
            </span>
            <p className="text-gray-600">CPSC Compliant, Non-Toxic Materials</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const SizeGuideTab = () => {
  // Example size chart data - adjust based on your actual products
  const sizeChartData = [
    {
      age: "0-3 months",
      height: "50-60 cm",
      weight: "3-6 kg",
      chest: "40-45 cm",
      waist: "38-42 cm",
    },
    {
      age: "3-6 months",
      height: "60-67 cm",
      weight: "6-8 kg",
      chest: "45-48 cm",
      waist: "42-44 cm",
    },
    {
      age: "6-12 months",
      height: "67-76 cm",
      weight: "8-10 kg",
      chest: "48-50 cm",
      waist: "44-46 cm",
    },
    {
      age: "1-2 years",
      height: "76-92 cm",
      weight: "10-13 kg",
      chest: "50-52 cm",
      waist: "46-50 cm",
    },
    {
      age: "2-3 years",
      height: "92-98 cm",
      weight: "13-15 kg",
      chest: "52-54 cm",
      waist: "50-52 cm",
    },
    {
      age: "3-4 years",
      height: "98-104 cm",
      weight: "15-17 kg",
      chest: "54-56 cm",
      waist: "52-54 cm",
    },
    {
      age: "4-5 years",
      height: "104-110 cm",
      weight: "17-19 kg",
      chest: "56-58 cm",
      waist: "54-56 cm",
    },
  ]

  return (
    <div id="size-guide" className="py-4">
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900 mb-2">How to Measure</h3>
        <p className="text-sm text-gray-600 mb-4">
          For the best fit, take measurements directly on your child's body
          while they're standing in a relaxed position. Measure around the
          fullest part for chest and the natural waistline for waist.
        </p>

        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-md h-48 bg-gray-100 rounded-lg">
            {/* Placeholder for measurement diagram */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              Measurement Diagram
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Age
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Height
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Weight
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Chest
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Waist
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sizeChartData.map((size, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-4 py-2 text-sm text-gray-900">{size.age}</td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  {size.height}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  {size.weight}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  {size.chest}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  {size.waist}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-1">Sizing Tip</h4>
        <p className="text-sm text-blue-700">
          If your child is between sizes, we recommend sizing up for longer
          wear. Our products are designed with growth in mind.
        </p>
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="text-sm py-4">
      <div className="grid grid-cols-1 gap-y-6">
        <div className="flex items-start gap-x-4">
          <div className="flex-shrink-0">
            <FastDelivery className="text-purple-600 w-8 h-8" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Fast delivery</h3>
            <p className="text-gray-600">
              Your package will arrive in 3-5 business days at your pick up
              location or in the comfort of your home. We offer free shipping on
              all orders over $50.
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              <div className="bg-gray-100 p-2 rounded">
                <span className="font-medium">Standard Shipping</span>
                <p className="mt-1">3-5 business days</p>
                <p className="font-medium mt-1">$4.99</p>
              </div>
              <div className="bg-gray-100 p-2 rounded">
                <span className="font-medium">Express Shipping</span>
                <p className="mt-1">1-2 business days</p>
                <p className="font-medium mt-1">$9.99</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-x-4">
          <div className="flex-shrink-0">
            <Refresh className="text-purple-600 w-8 h-8" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">
              Simple exchanges
            </h3>
            <p className="text-gray-600">
              Is the fit not quite right? No worries - we'll exchange your
              product for a new one. Exchanges are free within 30 days of
              purchase.
            </p>
            <div className="mt-2 bg-gray-100 p-2 rounded text-xs">
              <span className="font-medium">How to Exchange</span>
              <ol className="mt-1 list-decimal pl-4 space-y-1">
                <li>Contact our customer service team</li>
                <li>Receive a prepaid return label</li>
                <li>Ship your unworn item back to us</li>
                <li>We'll send your new size right away</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-x-4">
          <div className="flex-shrink-0">
            <Back className="text-purple-600 w-8 h-8" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Easy returns</h3>
            <p className="text-gray-600">
              Just return your product and we'll refund your money. No questions
              asked – we'll do our best to make sure your return is hassle-free.
            </p>
            <div className="mt-2 bg-green-50 p-2 rounded text-xs text-green-800">
              <span className="font-medium">Return Policy</span>
              <ul className="mt-1 space-y-1">
                <li>• 30-day return window</li>
                <li>• Items must be unworn with tags attached</li>
                <li>• Free returns on orders over $50</li>
                <li>• $4.99 return fee for orders under $50</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const CareInstructionsTab = ({ product }: ProductTabsProps) => {
  // Default care instructions
  const careInstructions = [
    {
      icon: "🧼",
      title: "Washing",
      instructions:
        "Machine wash cold with similar colors. Gentle cycle recommended.",
    },
    {
      icon: "🔄",
      title: "Drying",
      instructions: "Tumble dry low or hang to dry for best results.",
    },
    {
      icon: "🔥",
      title: "Ironing",
      instructions:
        "Iron on low heat if needed. Do not iron decorations or prints.",
    },
    {
      icon: "⚠️",
      title: "Warnings",
      instructions: "Do not bleach. Do not dry clean.",
    },
  ]

  return (
    <div className="py-4">
      <p className="text-sm text-gray-600 mb-4">
        Proper care will extend the life of your child's clothing and keep it
        looking its best.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {careInstructions.map((care, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="text-xl mr-2">{care.icon}</span>
              <h3 className="font-semibold text-gray-900">{care.title}</h3>
            </div>
            <p className="text-sm text-gray-600">{care.instructions}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
        <h3 className="font-semibold text-yellow-800 mb-2">
          Care Tips for Children's Clothing
        </h3>
        <ul className="text-sm text-yellow-700 space-y-2">
          <li className="flex items-start">
            <span className="text-yellow-600 mr-2">•</span>
            Pre-treat stains promptly for best results
          </li>
          <li className="flex items-start">
            <span className="text-yellow-600 mr-2">•</span>
            Wash inside out to protect prints and colors
          </li>
          <li className="flex items-start">
            <span className="text-yellow-600 mr-2">•</span>
            Use mild, child-safe detergent
          </li>
          <li className="flex items-start">
            <span className="text-yellow-600 mr-2">•</span>
            Avoid fabric softeners on flame-resistant sleepwear
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ProductTabs
