import Link from "next/link"

import { Logo } from "@/components/common/logo"
import { ThemeToggle } from "@/components/common/theme-toggle"
import { Container } from "@/components/layout/container"
import { MainNav } from "@/components/layout/main-nav"
import { MobileNav } from "@/components/layout/mobile-nav"
import { buttonVariants } from "@/components/ui/button"
import { mainNav } from "@/lib/site-config"

// 마케팅 페이지 상단 헤더
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <Container className="flex h-14 items-center gap-4">
        <MobileNav items={mainNav} />
        <Logo />
        <MainNav items={mainNav} />
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/signup"
            className={buttonVariants({ size: "sm" })}
          >
            시작하기
          </Link>
        </div>
      </Container>
    </header>
  )
}
