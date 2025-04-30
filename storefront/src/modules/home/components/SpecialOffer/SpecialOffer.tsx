// import Image from "next/image"
// import Button from "../Button/Button"
import { offer } from "../../../../../public/assets/images"
// import { arrowRight } from "../../../../../public/assets/icons"

// const SpecialOffer = () => {
//   return (
//     <section className="flex justify-wrap items-center max-xl:flex-col-reverse gap-10 max-container">
//       <div className="flex-1">
//         <Image
//           src={offer}
//           alt="special-offer"
//           width={773}
//           height={687}
//           className="object-contain w-full"
//         />
//       </div>
//       <div className="flex flex-1 flex-col">
//         <h2
//           className="font-palanquin text-4xl font-bold capitalize
//       lg:max-w-lg"
//         >
//           <span className="text-coral-red"> Special </span>
//           Offer
//         </h2>
//         <p className="mt-4 lg:max-w-lg info-text">
//           Crafted with precision, designed for durability. Our shoes blend
//           premium materials with expert craftsmanship to deliver lasting quality
//           and style.
//         </p>
//         <p className="mt-6 lg:max-w-lg info-text">
//           Experience next-level comfort with our advanced cushioning technology.
//           Whether you're running errands or hitting the gym, your feet stay
//           supported all day long.
//         </p>
//         <div className="mt-11 flex flex-wrap gap-4">
//           <Button label="Shop Now" iconURL={arrowRight} />
//           <Button
//             label="Learn More"
//             iconURL=""
//             backgroundColor="bg-white"
//             borderColor="border-slate-gray"
//             textColor="text-slate-gray"
//           />
//         </div>
//       </div>
//     </section>
//   )
// }

// export default SpecialOffer

// File: @modules/home/components/SpecialOffer/SpecialOffer.tsx

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const SpecialOffer = () => {
  return (
    <section className="flex justify-between items-center max-xl:flex-col gap-10 max-container">
      <div className="flex-1">
        <Image
          src={offer}
          alt="Special Offer - Back to School Collection"
          width={773}
          height={687}
          className="object-contain w-full"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <h2 className="text-4xl font-palanquin font-bold">
          <span className="text-purple-600">Special </span>
          Offer
        </h2>

        <p className="mt-4 info-text">
          Get ready for the new school year with our exclusive Back to School
          collection! Mix and match tops, bottoms, and accessories for a perfect
          first day look.
        </p>

        <div className="mt-6 flex flex-wrap gap-4">
          <div className="flex flex-col justify-center items-center bg-purple-100 rounded-xl px-5 py-3">
            <p className="text-4xl font-palanquin font-bold text-purple-600">
              20%
            </p>
            <p className="text-slate-gray">OFF</p>
          </div>
          <div className="flex flex-col justify-center items-center bg-yellow-100 rounded-xl px-5 py-3">
            <p className="text-4xl font-palanquin font-bold text-yellow-600">
              15%
            </p>
            <p className="text-slate-gray">EXTRA</p>
            <p className="text-slate-gray text-sm">On bundles</p>
          </div>
        </div>

        <p className="mt-10 info-text">
          Our Back to School collection features comfortable, durable, and
          stylish pieces that can withstand playground adventures while keeping
          your kids looking their best.
        </p>

        <div className="mt-11 flex flex-wrap gap-4">
          <Link
            href="/collections/back-to-school"
            className="flex justify-center items-center gap-2 px-7 py-4 border font-montserrat text-lg leading-none bg-purple-600 rounded-full text-white border-purple-600 hover:bg-purple-700 transition-colors"
          >
            Shop Collection
            <ArrowRight className="h-5 w-5" />
          </Link>

          <Link
            href="/lookbook"
            className="flex justify-center items-center gap-2 px-7 py-4 border font-montserrat text-lg leading-none rounded-full text-slate-gray border-slate-gray hover:bg-slate-100 transition-colors"
          >
            View Lookbook
          </Link>
        </div>
      </div>
    </section>
  )
}

export default SpecialOffer
