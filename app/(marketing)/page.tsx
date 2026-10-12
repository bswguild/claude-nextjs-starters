import { Cta } from "@/components/sections/cta"
import { Faq } from "@/components/sections/faq"
import { Features } from "@/components/sections/features"
import { Hero } from "@/components/sections/hero"

// 랜딩 페이지
export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Faq />
      <Cta />
    </>
  )
}
