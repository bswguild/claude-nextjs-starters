import type { Metadata } from "next"

import { EmptyState } from "@/components/common/empty-state"
import { PageHeader } from "@/components/common/page-header"

export const metadata: Metadata = { title: "통계" }

export default function AnalyticsPage() {
  return (
    <>
      <PageHeader title="통계" description="주요 지표와 활동 현황을 확인합니다." />
      <EmptyState title="표시할 통계 데이터가 없습니다" description="데이터가 수집되면 이곳에 표시됩니다." />
    </>
  )
}
