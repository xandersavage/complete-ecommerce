import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"
import { footerLogo } from "../../../../../public/assets/images"
import { footerLinks, socialMedia } from "../../../../../public/constants"
import { copyrightSign } from "../../../../../public/assets/icons"

const index = () => {
  return (
    <section className=" bg-black padding-x padding-t pb-8">
      <footer className="max-container">
        <div
          className="flex justify-between items-start gap-20 flex-wrap
        max-lg:flex-col"
        >
          <div className="flex flex-col items-start">
            <LocalizedClientLink href="/">
              <Image src={footerLogo} width={150} height={46} />
            </LocalizedClientLink>
            <p
              className="mt-6 text-base leading-7 font-montserrat
            text-white-400 sm:max-w-sm"
            >
              Make a statement with every step. Our designs combine contemporary
              trends with timeless appeal, ensuring you stand out for all the
              right reasons.
            </p>
            <div className="flex items-center gap-5 mt-8">
              {socialMedia.map((icon) => (
                <div
                  className="flex justify-center items-center w-12 h-12 bg-white
                rounded-full"
                >
                  <Image alt={icon.alt} src={icon.src} width={24} height={24} />
                </div>
              ))}
            </div>
          </div>
          <div
            className="flex flex-1 justify-between lg:gap-10
          gap-20 flex-wrap"
          >
            {footerLinks.map((section) => (
              <div key={section}>
                <h4
                  className="text-white font-montserrat
                text-2xl leading-normal font-medium mb-6"
                >
                  {section.title}
                </h4>
                <ul>
                  {section.links.map((link) => (
                    <li
                      key={link.name}
                      className="mt-3 text-white-400 font-montserrat text-base
                    leading-normal hover:text-slate-gray cursor-pointer"
                    >
                      <LocalizedClientLink
                        href={link.link}
                        className="text-white-400 hover:text-white"
                      >
                        {link.name}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div
          className="flex justify-between text-white-400 mt-24
        max-sm:flex-col max-sm:items-center"
        >
          <div
            className="flex flex-1 justify-start items-center gap-2
          font-montserrat cursor-pointer"
          >
            <Image
              src={copyrightSign}
              alt="CopyRight"
              width={20}
              height={20}
              className="rounded-full m-0"
            />
            <p>Copyright. All rights reserved</p>
          </div>
          <p className="font-montserrat text-base leading-7 cursor-pointer">
            Terms & Conditions
          </p>
        </div>
      </footer>
    </section>
  )
}

export default index
