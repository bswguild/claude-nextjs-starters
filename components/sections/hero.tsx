import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Container } from "@/components/layout/container"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { siteConfig } from "@/lib/site-config"

// 랜딩 히어로 섹션
export function Hero() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="flex flex-col items-center gap-6 text-center">
        <Badge variant="secondary">Next.js 16 · Tailwind v4 · shadcn/ui</Badge>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          아이디어를 가장 빠르게
          <br className="hidden sm:block" /> 웹으로 만드세요
        </h1>
        <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
          {siteConfig.description}. 레이아웃, 다크 모드, 폼 검증이 이미 준비되어
          있습니다.
        </p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link href="/dashboard" className={buttonVariants({ size: "lg" })}>
            대시보드 보기 <ArrowRight data-icon="inline-end" />
          </Link>
          <Link
            href="/signup"
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            회원가입
          </Link>
        </div>
      </Container>
    </section>
  )
}
