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

// 단일 시리즈 추이 차트 — 범례 없이 직접 라벨만 사용
const months = ["1월", "2월", "3월", "4월", "5월", "6월"]
const values = [32, 41, 38, 52, 61, 74]

const WIDTH = 300
const HEIGHT = 160
const PAD_LEFT = 26
const PAD_RIGHT = 12
const PAD_TOP = 14
const BASELINE_Y = 124
const STEP_UNIT = 20

const { gridSteps, toY } = createLinearScale(values, STEP_UNIT, PAD_TOP, BASELINE_Y)
const toX = createXScale(months.length, WIDTH, PAD_LEFT, PAD_RIGHT)

export function LineChartCard() {
  const points = values.map((value, index) => ({
    x: toX(index),
    y: toY(value),
    value,
    label: months[index],
  }))
  const path = points
    .map((point, index) => `${index === 0 ? "M" : "L"}${point.x},${point.y}`)
    .join(" ")
  const last = points[points.length - 1]

  return (
    <Card className="viz-charts">
      <CardHeader>
        <CardTitle>월별 방문자 추이</CardTitle>
        <CardDescription>최근 6개월, 단위: 천 명</CardDescription>
      </CardHeader>
      <CardContent>
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="h-auto w-full"
          role="img"
          aria-label={`월별 방문자 추이: ${months
            .map((month, index) => `${month} ${values[index]}천 명`)
            .join(", ")}`}
        >
          <ChartGridLines
            steps={gridSteps}
            toY={toY}
            width={WIDTH}
            padLeft={PAD_LEFT}
            padRight={PAD_RIGHT}
          />

          <path
            d={path}
            fill="none"
            style={{ stroke: "var(--viz-series-1)" }}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {points.map((point) => (
            <circle
              key={point.label}
              cx={point.x}
              cy={point.y}
              r={point === last ? 4 : 3}
              style={{
                fill: "var(--viz-series-1)",
                stroke: "var(--card)",
              }}
              strokeWidth={2}
            >
              <title>{`${point.label}: ${point.value}천 명`}</title>
            </circle>
          ))}

          <text
            x={last.x}
            y={last.y - 10}
            textAnchor="end"
            fontSize={11}
            fontWeight={600}
            style={{ fill: "var(--foreground)" }}
          >
            {last.value}천
          </text>

          {months.map((month, index) => (
            <text
              key={month}
              x={toX(index)}
              y={HEIGHT - 4}
              textAnchor="middle"
              fontSize={10}
              style={{ fill: "var(--muted-foreground)" }}
            >
              {month}
            </text>
          ))}
        </svg>
      </CardContent>
    </Card>
  )
}
