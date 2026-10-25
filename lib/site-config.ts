import { BarChart3, Home, LayoutDashboard, Settings, Users } from "lucide-react"

import type { NavItem } from "@/types/nav"

// 사이트 전역 설정 — 프로젝트 시작 시 이 파일부터 수정하세요
export const siteConfig = {
  name: "Starter Kit",
  description: "Next.js 16, Tailwind CSS, shadcn/ui로 빠르게 시작하는 웹 스타터킷",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
}

// 마케팅 헤더/푸터 내비게이션
export const mainNav: NavItem[] = [
  { title: "홈", href: "/" },
  { title: "대시보드", href: "/dashboard" },
  { title: "로그인", href: "/login" },
]

// 대시보드 사이드바 내비게이션
export const dashboardNav: NavItem[] = [
  { title: "개요", href: "/dashboard", icon: LayoutDashboard },
  { title: "통계", href: "/dashboard/analytics", icon: BarChart3 },
  { title: "사용자관리", href: "/dashboard/users", icon: Users },
  { title: "설정", href: "/dashboard/settings", icon: Settings },
]

// 대시보드 사이드바 푸터 내비게이션 (대시보드 이탈용)
export const dashboardFooterNav: NavItem[] = [
  { title: "홈으로 돌아가기", href: "/", icon: Home },
]
