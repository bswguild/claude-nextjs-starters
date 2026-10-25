import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// 단일 시리즈 비교 차트 — 막대 끝에 값 직접 표기
const categories = ["검색", "소셜", "추천", "직접"]
const values = [120, 95, 150, 60]

const WIDTH = 300
const HEIGHT = 160
const PAD_LEFT = 26
const PAD_RIGHT = 12
const BASELINE_Y = 124
const MAX_VALUE = 160
const GRID_STEPS = [0, 40, 80, 120, 160]
const BAR_WIDTH = 22

function toY(value: number) {
  const plotTop = 14
  const plotHeight = BASELINE_Y - plotTop
  return BASELINE_Y - (plotHeight * value) / MAX_VALUE
}

export function BarChartCard() {
  const plotWidth = WIDTH - PAD_LEFT - PAD_RIGHT
  const slot = plotWidth / categories.length

  return (
    <Card className="viz-charts">
      <CardHeader>
        <CardTitle>채널별 신규 가입자</CardTitle>
        <CardDescription>이번 달, 단위: 명</CardDescription>
      </CardHeader>
      <CardContent>
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="h-auto w-full"
          role="img"
          aria-label={`채널별 신규 가입자: ${categories
            .map((category, index) => `${category} ${values[index]}명`)
            .join(", ")}`}
        >
          {GRID_STEPS.map((step) => (
            <line
              key={step}
              x1={PAD_LEFT}
              x2={WIDTH - PAD_RIGHT}
              y1={toY(step)}
              y2={toY(step)}
              style={{ stroke: "var(--border)" }}
              strokeWidth={1}
            />
          ))}

          {categories.map((category, index) => {
            const value = values[index]
            const barHeight = BASELINE_Y - toY(value)
            const x = PAD_LEFT + slot * index + (slot - BAR_WIDTH) / 2

            return (
              <g key={category}>
                <rect
                  x={x}
                  y={toY(value)}
                  width={BAR_WIDTH}
                  height={barHeight}
                  rx={4}
                  style={{ fill: "var(--viz-series-1)" }}
                >
                  <title>{`${category}: ${value}명`}</title>
                </rect>
                <text
                  x={x + BAR_WIDTH / 2}
                  y={toY(value) - 6}
                  textAnchor="middle"
                  fontSize={11}
                  fontWeight={600}
                  style={{ fill: "var(--foreground)" }}
                >
                  {value}
                </text>
                <text
                  x={x + BAR_WIDTH / 2}
                  y={HEIGHT - 4}
                  textAnchor="middle"
                  fontSize={10}
                  style={{ fill: "var(--muted-foreground)" }}
                >
                  {category}
                </text>
              </g>
            )
          })}
        </svg>
      </CardContent>
    </Card>
  )
}
