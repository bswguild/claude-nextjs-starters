import "./chart-colors.css"

import { AreaChartCard } from "@/components/sections/analytics/area-chart-card"
import { BarChartCard } from "@/components/sections/analytics/bar-chart-card"
import { DonutChartCard } from "@/components/sections/analytics/donut-chart-card"
import { LineChartCard } from "@/components/sections/analytics/line-chart-card"

// 자주 쓰이는 차트 4종(선/막대/도넛/영역)을 2x2로 배치한 예제 그리드
export function AnalyticsChartGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <LineChartCard />
      <BarChartCard />
      <DonutChartCard />
      <AreaChartCard />
    </div>
  )
}
