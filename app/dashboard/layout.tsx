import { AppHeader } from "@/components/layout/app-header"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

// 대시보드 레이아웃: 사이드바 + 상단바 + 본문
export default function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <div className="flex-1 space-y-6 p-4 sm:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
