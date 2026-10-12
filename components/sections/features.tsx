import { FormInput, LayoutDashboard, Moon, Smartphone } from "lucide-react"

import { Container } from "@/components/layout/container"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// 기능 소개 데이터 — 배열만 수정하면 섹션이 갱신됨
const features = [
  {
    icon: LayoutDashboard,
    title: "준비된 레이아웃",
    description: "마케팅, 인증, 대시보드 레이아웃을 route group으로 분리했습니다.",
  },
  {
    icon: Moon,
    title: "다크 모드",
    description: "next-themes 기반으로 깜빡임 없이 라이트/다크/시스템을 지원합니다.",
  },
  {
    icon: FormInput,
    title: "폼 & 검증",
    description: "React Hook Form + Zod로 타입 안전한 폼을 바로 만들 수 있습니다.",
  },
  {
    icon: Smartphone,
    title: "반응형 UI",
    description: "모바일부터 데스크톱까지 대응하는 헤더, 사이드바, 시트 메뉴.",
  },
]

// 랜딩 기능 소개 섹션
export function Features() {
  return (
    <section className="border-t bg-muted/30 py-16 sm:py-20">
      <Container className="space-y-10">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold tracking-tight">핵심 기능</h2>
          <p className="text-muted-foreground">
            반복 작업은 줄이고 제품에 집중하세요.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <feature.icon className="mb-2 size-6 text-primary" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
