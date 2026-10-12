import Link from "next/link"
import { Rocket } from "lucide-react"

import { siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  href?: string
}

// 사이트 로고 (아이콘 + 사이트명)
export function Logo({ className, href = "/" }: LogoProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 overflow-hidden font-semibold",
        className
      )}
    >
      <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <Rocket className="size-4" />
      </span>
      <span className="truncate group-data-[collapsible=icon]:hidden">
        {siteConfig.name}
      </span>
    </Link>
  )
}
