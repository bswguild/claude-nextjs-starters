import "./chart-colors.css"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartGridLines } from "@/components/sections/analytics/chart-grid-lines"
import { createLinearScale, createXScale } from "@/components/sections/analytics/chart-scale"

// 단일 시리즈 누적 추이 차트 — 선 아래 10% 투명도 영역 채우기
const days = ["월", "화", "수", "목", "금", "토", "일"]
const values = [120, 135, 128, 150, 180, 210, 195]

const WIDTH = 300
const HEIGHT = 160
const PAD_LEFT = 26
const PAD_RIGHT = 12
const PAD_TOP = 14
const BASELINE_Y = 124
const STEP_UNIT = 60

const { gridSteps, toY } = createLinearScale(values, STEP_UNIT, PAD_TOP, BASELINE_Y)
const toX = createXScale(days.length, WIDTH, PAD_LEFT, PAD_RIGHT)

export function AreaChartCard() {
  const points = values.map((value, index) => ({
    x: toX(index),
    y: toY(value),
    value,
    label: days[index],
  }))
  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"}${point.x},${point.y}`)
    .join(" ")
  const areaPath = `${linePath} L${points[points.length - 1].x},${BASELINE_Y} L${points[0].x},${BASELINE_Y} Z`
  const last = points[points.length - 1]

  return (
    <Card className="viz-charts">
      <CardHeader>
        <CardTitle>주간 페이지뷰</CardTitle>
        <CardDescription>이번 주, 단위: 회</CardDescription>
      </CardHeader>
      <CardContent>
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="h-auto w-full"
          role="img"
          aria-label={`주간 페이지뷰: ${days
            .map((day, index) => `${day} ${values[index]}회`)
            .join(", ")}`}
        >
          <ChartGridLines
            steps={gridSteps}
            toY={toY}
            width={WIDTH}
            padLeft={PAD_LEFT}
            padRight={PAD_RIGHT}
          />

          <path d={areaPath} style={{ fill: "var(--viz-series-1)" }} opacity={0.1} />

          <path
            d={linePath}
            fill="none"
            style={{ stroke: "var(--viz-series-1)" }}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <circle
            cx={last.x}
            cy={last.y}
            r={4}
            style={{ fill: "var(--viz-series-1)", stroke: "var(--card)" }}
            strokeWidth={2}
          >
            <title>{`${last.label}: ${last.value}회`}</title>
          </circle>
          <text
            x={last.x}
            y={last.y - 10}
            textAnchor="end"
            fontSize={11}
            fontWeight={600}
            style={{ fill: "var(--foreground)" }}
          >
            {last.value}
          </text>

          {days.map((day, index) => (
            <text
              key={day}
              x={toX(index)}
              y={HEIGHT - 4}
              textAnchor="middle"
              fontSize={10}
              style={{ fill: "var(--muted-foreground)" }}
            >
              {day}
            </text>
          ))}
        </svg>
      </CardContent>
    </Card>
  )
}
