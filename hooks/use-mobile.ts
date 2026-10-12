import { useMediaQuery } from "usehooks-ts"

const MOBILE_BREAKPOINT = 768

// 모바일 뷰포트 여부 (usehooks-ts 사용, SSR에서는 false로 시작해 하이드레이션 불일치 방지)
export function useIsMobile() {
  return useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`, {
    initializeWithValue: false,
  })
}
