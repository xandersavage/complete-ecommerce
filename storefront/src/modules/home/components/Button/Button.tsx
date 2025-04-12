import Image from "next/image"

const Button = ({
  label,
  iconURL,
  backgroundColor,
  textColor,
  borderColor,
  fullWidth,
}) => {
  return (
    <button
      className={`flex justify-center items-center
    gap-2 px-7 py-4 border font-montserrat text-lg
    leading-none

    ${
      backgroundColor
        ? `${backgroundColor} ${textColor} ${borderColor} text-coral-red`
        : "bg-coral-red   border-coral-red text-white"
    } rounded-full ${
        fullWidth && "w-full"
      } hover:bg-white hover:text-coral-red "}`}
    >
      {label}
      {iconURL && (
        <Image
          src={iconURL}
          alt="Arrow Right"
          className="ml-2 rounded-full w-5 h-5"
        />
      )}
    </button>
  )
}

export default Button
