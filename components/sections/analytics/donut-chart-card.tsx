import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// 부분-전체 비율 차트 — 카테고리 색상 4개 슬롯 + 범례(스와치)로 구분
const segments = [
  { label: "검색", percent: 42, color: "var(--viz-series-1)" },
  { label: "소셜", percent: 28, color: "var(--viz-series-2)" },
  { label: "직접", percent: 18, color: "var(--viz-series-3)" },
  { label: "기타", percent: 12, color: "var(--viz-series-4)" },
]

const SIZE = 160
const CENTER = SIZE / 2
const RADIUS = 60
const STROKE_WIDTH = 24
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const arcs = segments.reduce<
  { label: string; color: string; percent: number; arcLength: number; offset: number }[]
>((acc, segment) => {
  const previous = acc[acc.length - 1]
  const cumulative = previous ? previous.offset + previous.arcLength : 0
  const arcLength = (segment.percent / 100) * CIRCUMFERENCE
  return [...acc, { ...segment, arcLength, offset: cumulative }]
}, [])

export function DonutChartCard() {
  return (
    <Card className="viz-charts">
      <CardHeader>
        <CardTitle>트래픽 소스 비율</CardTitle>
        <CardDescription>최근 30일</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 sm:flex-row">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="h-40 w-40 shrink-0"
          role="img"
          aria-label={`트래픽 소스 비율: ${segments
            .map((segment) => `${segment.label} ${segment.percent}%`)
            .join(", ")}`}
        >
          <g transform={`rotate(-90 ${CENTER} ${CENTER})`}>
            {arcs.map((segment) => (
              <circle
                key={segment.label}
                cx={CENTER}
                cy={CENTER}
                r={RADIUS}
                fill="none"
                style={{ stroke: segment.color }}
                strokeWidth={STROKE_WIDTH}
                strokeDasharray={`${segment.arcLength} ${CIRCUMFERENCE}`}
                strokeDashoffset={-segment.offset}
              >
                <title>{`${segment.label}: ${segment.percent}%`}</title>
              </circle>
            ))}
          </g>
          <text
            x={CENTER}
            y={CENTER}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={20}
            fontWeight={600}
            style={{ fill: "var(--foreground)" }}
          >
            100%
          </text>
        </svg>

        <ul className="w-full space-y-1.5 text-sm">
          {segments.map((segment) => (
            <li key={segment.label} className="flex items-center gap-2">
              <span
                aria-hidden
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: segment.color }}
              />
              <span className="flex-1 text-foreground">{segment.label}</span>
              <span className="text-muted-foreground">{segment.percent}%</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
