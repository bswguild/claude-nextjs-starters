import Link from "next/link"

import { Logo } from "@/components/common/logo"
import { Container } from "@/components/layout/container"
import { Copyright } from "@/components/layout/copyright"
import { mainNav, siteConfig } from "@/lib/site-config"

// 마케팅 페이지 하단 푸터
export function SiteFooter() {
  return (
    <footer className="border-t">
      <Container className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <Logo />
          <p className="text-sm text-muted-foreground">
            {siteConfig.description}
          </p>
        </div>
        <nav className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </Container>
      <Container className="pb-8 text-xs text-muted-foreground">
        <Copyright />
      </Container>
    </footer>
  )
}
