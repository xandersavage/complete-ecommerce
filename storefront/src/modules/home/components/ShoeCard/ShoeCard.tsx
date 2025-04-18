"use client"

import Image from "next/image"
const ShoeCard = ({ imgURL, changeBigShoeImage, bigShoeImg }) => {
  const handleClick = () => {
    if (bigShoeImg !== imgURL.tshirt) {
      changeBigShoeImage(imgURL.tshirt)
    }
  }

  return (
    <div
      className={`border-2 rounded-xl ${
        bigShoeImg === imgURL.tshirt ? "border-coral-red" : "border-transparent"
      } cursor-pointer max-sm:flex-1`}
      onClick={handleClick}
    >
      <div className="flex justify-center items-center bg-card bg-center bg-cover sm:w-40 sm:h-40 rounded-xl max-sm:p-4">
        <Image
          src={imgURL.tshirt}
          alt="shoe colletion"
          width={127}
          height={103.34}
          className="object-contain"
        />
      </div>
    </div>
  )
}

export default ShoeCard
