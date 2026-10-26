// area/bar/line 차트가 공유하는 선형 스케일 계산 유틸
// 데이터 최댓값을 stepUnit 단위로 올림해 그리드를 동적으로 계산하므로,
// 값이 바뀌어도 플롯 영역(그리드)을 벗어나지 않는다.
export function createLinearScale(
  values: number[],
  stepUnit: number,
  plotTop: number,
  baselineY: number
) {
  const maxValue = Math.ceil(Math.max(...values) / stepUnit) * stepUnit
  const gridSteps = Array.from(
    { length: maxValue / stepUnit + 1 },
    (_, i) => i * stepUnit
  )
  const plotHeight = baselineY - plotTop

  function toY(value: number) {
    return baselineY - (plotHeight * value) / maxValue
  }

  return { maxValue, gridSteps, toY }
}

export function createXScale(
  count: number,
  width: number,
  padLeft: number,
  padRight: number
) {
  const plotWidth = width - padLeft - padRight

  function toX(index: number) {
    return padLeft + (plotWidth * index) / (count - 1)
  }

  return toX
}
