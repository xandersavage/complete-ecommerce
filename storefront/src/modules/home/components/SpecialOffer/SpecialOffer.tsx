import Image from "next/image"
import Button from "../Button/Button"
import { offer } from "../../../../../public/assets/images"
import { arrowRight } from "../../../../../public/assets/icons"

const SpecialOffer = () => {
  return (
    <section className="flex justify-wrap items-center max-xl:flex-col-reverse gap-10 max-container">
      <div className="flex-1">
        <Image
          src={offer}
          alt="special-offer"
          width={773}
          height={687}
          className="object-contain w-full"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <h2
          className="font-palanquin text-4xl font-bold capitalize
      lg:max-w-lg"
        >
          <span className="text-coral-red"> Special </span>
          Offer
        </h2>
        <p className="mt-4 lg:max-w-lg info-text">
          Crafted with precision, designed for durability. Our shoes blend
          premium materials with expert craftsmanship to deliver lasting quality
          and style.
        </p>
        <p className="mt-6 lg:max-w-lg info-text">
          Experience next-level comfort with our advanced cushioning technology.
          Whether you're running errands or hitting the gym, your feet stay
          supported all day long.
        </p>
        <div className="mt-11 flex flex-wrap gap-4">
          <Button label="Shop Now" iconURL={arrowRight} />
          <Button
            label="Learn More"
            iconURL=""
            backgroundColor="bg-white"
            borderColor="border-slate-gray"
            textColor="text-slate-gray"
          />
        </div>
      </div>
    </section>
  )
}

export default SpecialOffer
