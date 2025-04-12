import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Image from "next/image"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  // Determine grid layout based on number of images
  const getGridClass = () => {
    if (images.length === 0) return "grid-cols-1"
    if (images.length === 1) return "grid-cols-1"
    if (images.length === 2) return "grid-cols-2"
    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]"
  }

  // Determine aspect ratio based on number of images
  const getAspectRatioClass = (index: number) => {
    if (images.length === 1) {
      return "aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9]"
    }

    return "aspect-square md:aspect-[4/3] lg:aspect-[3/4]"
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        className={`
        grid 
        gap-4 
        sm:gap-6 
        lg:gap-8 
        ${getGridClass()}
      `}
      >
        {images.map((image, index) => {
          const aspectRatioClass = getAspectRatioClass(index)

          return (
            <Container
              key={image.id}
              className={`
                relative 
                w-full 
                ${aspectRatioClass}
                overflow-hidden 
                rounded-lg 
                shadow-md 
                hover:shadow-xl 
                transition-shadow 
                duration-300 
                bg-white 
                flex 
                items-center 
                justify-center
              `}
              id={image.id}
            >
              {!!image.url && (
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={image.url}
                    priority={index <= 2}
                    className="
                      max-w-full 
                      max-h-full 
                      object-contain 
                      hover:scale-105 
                      transition-transform 
                      duration-300 
                      ease-in-out
                    "
                    alt={`Product image ${index + 1}`}
                    fill
                    sizes="
                      (max-width: 640px) 100vw, 
                      (max-width: 768px) 50vw, 
                      (max-width: 1024px) 33.33vw, 
                      25vw
                    "
                  />
                </div>
              )}
            </Container>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGallery
