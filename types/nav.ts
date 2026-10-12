import type { LucideIcon } from "lucide-react"

// 내비게이션 항목 공통 타입
export interface NavItem {
  title: string
  href: string
  icon?: LucideIcon
  description?: string
}
