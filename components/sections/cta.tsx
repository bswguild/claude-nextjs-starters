import Link from "next/link"

import { Container } from "@/components/layout/container"
import { buttonVariants } from "@/components/ui/button"

// 랜딩 하단 행동 유도 섹션
export function Cta() {
  return (
    <section className="border-t py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight">지금 바로 시작하세요</h2>
        <p className="text-muted-foreground">
          스타터킷 위에서 첫 화면을 바로 만들어 보세요.
        </p>
        <Link href="/signup" className={buttonVariants({ size: "lg" })}>
          무료로 시작하기
        </Link>
      </Container>
    </section>
  )
}
