import React from "react"
import cn from "classnames"

type ContainerProps = {
  children: React.ReactNode
  className?: string
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10",
        className
      )}
    >
      {children}
    </div>
  )
}

export default Container
