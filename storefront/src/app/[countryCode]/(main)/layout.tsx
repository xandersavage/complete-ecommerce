import { Metadata } from "next"

import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav/PawklanNav"
import { getBaseURL } from "@lib/util/env"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  return (
    <div className="w-full overflow-x-hidden">
      <Nav />
      <div className="w-full max-w-[1440px] mx-auto">{props.children}</div>
      <Footer />
    </div>
  )
}
