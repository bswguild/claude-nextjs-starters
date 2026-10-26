// area/bar/line 차트가 공유하는 수평 그리드 라인
type ChartGridLinesProps = {
  steps: number[]
  toY: (value: number) => number
  width: number
  padLeft: number
  padRight: number
}

export function ChartGridLines({
  steps,
  toY,
  width,
  padLeft,
  padRight,
}: ChartGridLinesProps) {
  return (
    <>
      {steps.map((step) => (
        <line
          key={step}
          x1={padLeft}
          x2={width - padRight}
          y1={toY(step)}
          y2={toY(step)}
          style={{ stroke: "var(--border)" }}
          strokeWidth={1}
        />
      ))}
    </>
  )
}
