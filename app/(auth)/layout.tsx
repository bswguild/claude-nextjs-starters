import { Logo } from "@/components/common/logo"
import { ThemeToggle } from "@/components/common/theme-toggle"

// 인증 레이아웃: 화면 중앙에 카드 배치
export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="relative flex min-h-svh flex-1 flex-col items-center justify-center gap-6 p-4">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <Logo className="text-lg" />
      {children}
    </div>
  )
}
