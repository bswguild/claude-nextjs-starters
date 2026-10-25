import type { Metadata } from "next"

import { PageHeader } from "@/components/common/page-header"
import { AnalyticsChartGrid } from "@/components/sections/analytics/analytics-chart-grid"

export const metadata: Metadata = { title: "통계" }

export default function AnalyticsPage() {
  return (
    <>
      <PageHeader title="통계" description="주요 지표와 활동 현황을 확인합니다." />
      <AnalyticsChartGrid />
    </>
  )
}
