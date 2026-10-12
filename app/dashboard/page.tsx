import type { Metadata } from "next"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { Activity, CreditCard, DollarSign, Users } from "lucide-react"

import { PageHeader } from "@/components/common/page-header"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const metadata: Metadata = { title: "대시보드" }

// 통계 카드 예시 데이터
const stats = [
  { title: "총 매출", value: "₩45,231,890", change: "+20.1%", icon: DollarSign },
  { title: "신규 가입", value: "+2,350", change: "+180.1%", icon: Users },
  { title: "주문", value: "+12,234", change: "+19%", icon: CreditCard },
  { title: "활성 사용자", value: "+573", change: "+201명", icon: Activity },
]

// 최근 활동 예시 데이터 (타임존 없는 문자열 → 서버/클라이언트 동일하게 해석)
const activities = [
  { id: 1, user: "김민준", action: "결제 완료", status: "완료", date: "2026-10-12T09:30:00" },
  { id: 2, user: "이서연", action: "회원가입", status: "완료", date: "2026-10-11T18:05:00" },
  { id: 3, user: "박지호", action: "환불 요청", status: "대기", date: "2026-10-11T11:20:00" },
  { id: 4, user: "최유나", action: "주문 취소", status: "취소", date: "2026-10-10T15:45:00" },
]

const statusVariant = {
  완료: "default",
  대기: "secondary",
  취소: "destructive",
} as const

export default function DashboardPage() {
  return (
    <>
      <PageHeader title="개요" description="서비스 현황을 한눈에 확인하세요." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardDescription>{stat.title}</CardDescription>
              <stat.icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                지난달 대비 {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>최근 활동</CardTitle>
          <CardDescription>가장 최근에 발생한 이벤트입니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>사용자</TableHead>
                <TableHead>활동</TableHead>
                <TableHead>상태</TableHead>
                <TableHead className="text-right">일시</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium">{activity.user}</TableCell>
                  <TableCell>{activity.action}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        statusVariant[
                          activity.status as keyof typeof statusVariant
                        ]
                      }
                    >
                      {activity.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {format(new Date(activity.date), "M월 d일 a h:mm", {
                      locale: ko,
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
