import { shoe8 } from "../../../../../public/assets/images"
import { pawklanTshirt5 } from "../../../../../public/assets/images/pawklan/tshirt/transparent"
import Button from "../Button/Button"
import Image from "next/image"

const SuperQuality = () => {
  return (
    <section
      id="about-us"
      className="flex justify-between item-center
       max-lg:flex-col gap-10 w-full max-container"
    >
      <div className="flex flex-1 flex-col">
        <h2
          className="font-palanquin text-4xl font-bold capitalize
      lg:max-w-lg"
        >
          Elevate Your Style with
          <span className="text-coral-red"> Premium</span>
          <span className="text-coral-red"> Fashion</span> Clothing
        </h2>
        <p className="mt-4 lg:max-w-lg info-text">
          Discover a collection crafted for comfort and designed to keep you
          on-trend. From classic staples to bold statements, we have got your
          fashion needs covered.
        </p>
        <p className="mt-6 lg:max-w-lg info-text">
          Quality you can feel. Our premium fabrics and meticulous stitching
          ensure every item fits like a dream — and lasts.
        </p>
        <div className="mt-11">
          <Button label="View Details" iconURL="" />
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <Image
          src={pawklanTshirt5}
          alt="Super Quality"
          width={570}
          height={522}
          className="object-contain"
        />
      </div>
    </section>
  )
}

export default SuperQuality
