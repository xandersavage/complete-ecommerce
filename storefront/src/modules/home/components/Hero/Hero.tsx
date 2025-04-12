"use client"

import Image, { StaticImageData } from "next/image"
import Button from "@modules/home/components/Button/Button"
import { arrowRight } from "../../../../../public/assets/icons"
import { tshirt, statistics } from "../../../../../public/constants"
import { pawklanTshirt1 } from "../../../../../public/assets/images/pawklan/tshirt/transparent"
import ShoeCard from "@modules/home/components/ShoeCard/ShoeCard"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { SetStateAction, useState } from "react"
const Hero = () => {
  const [bigShoeImg, setBigShoeImg] = useState(pawklanTshirt1)
  return (
    <section
      id="hero"
      className="w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10 max-container"
    >
      <div
        className="relative xl:w-2/5 flex flex-col justify-center items-start
      w-full max-xl:padding-x pt-28"
      >
        <p className="text-xl font-montserrat text-coral-red">
          Wear The Bold, Own The Moment
        </p>
        <h1
          className="mt-10 font-palanquin text-8xl
        max-sm:text-[72px] font-bold"
        >
          <span
            className="xl:bg-white xl:whitespace-nowrap
          relative z-[8] pr-10"
          >
            New Arrival
          </span>
          <br />
          <span className="text-coral-red inline-block mt-3">Pawklan</span>{" "}
          Clothes
        </h1>
        <p
          className="fomontserrat text-slate-gray text-lg leading-8 mt-6
        mb-14 sm:max-w-sm"
        >
          Discover unique, trend-setting designs crafted for bold, confident
          fashion enthusiasts. Shop now and redefine your wardrobe.
        </p>
        <LocalizedClientLink href="/store">
          <Button label="Shop Now" iconURL={arrowRight} />
        </LocalizedClientLink>
        <div
          className="flex justify-start items-start flex-wrap
        w-full mt-20 gap-16"
        >
          {statistics.map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl font-palanquin font-bold">{stat.value}</p>
              <p className="leading-7 font-montserrat text-slate-gray">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div
        className="relative flex-1 flex justify-center xl:min-h-screen
      max-xl:py-40 bg-primary bg-hero bg-cover bg-center z-0"
      >
        <Image
          src={bigShoeImg}
          alt="Shoe"
          width={610}
          height={500}
          className="object-contain relative z-10"
        />
        <div
          className="flex sm:gap-6 gap-4 absolute -bottom-[5%]
        sm:left-[10%] max-sm:px-6"
        >
          {tshirt.map((image) => (
            <div key={image.id}>
              <ShoeCard
                imgURL={image}
                changeBigShoeImage={(shoe) => setBigShoeImg(shoe)}
                bigShoeImg={bigShoeImg}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
