// File: @modules/home/components/Services/Services.tsx

import React from "react"
import Image from "next/image"

const services = [
  {
    imgURL: "/icons/truck-fast.svg",
    label: "Free Shipping",
    subtext: "Free shipping on all orders over $50",
  },
  {
    imgURL: "/icons/shield-tick.svg",
    label: "Safe Materials",
    subtext: "All products tested for kid-friendly materials",
  },
  {
    imgURL: "/icons/support.svg",
    label: "Parent Support",
    subtext: "Dedicated support for busy parents 7 days a week",
  },
  {
    imgURL: "/icons/return.svg",
    label: "Easy Returns",
    subtext: "30-day hassle-free return policy",
  },
]

const Services = () => {
  return (
    <section className="max-container flex justify-center flex-wrap gap-9">
      {services.map((service) => (
        <div
          key={service.label}
          className="flex-1 sm:w-[350px] sm:min-w-[350px] w-full rounded-[20px] shadow-3xl px-10 py-16 bg-white hover:shadow-xl transition-shadow"
        >
          <div className="w-11 h-11 flex justify-center items-center bg-purple-500 rounded-full">
            <Image
              src={service.imgURL}
              alt={service.label}
              width={24}
              height={24}
            />
          </div>
          <h3 className="mt-5 font-palanquin text-3xl leading-normal font-bold">
            {service.label}
          </h3>
          <p className="mt-3 break-words font-montserrat text-lg leading-normal text-slate-gray">
            {service.subtext}
          </p>
        </div>
      ))}
    </section>
  )
}

export default Services
