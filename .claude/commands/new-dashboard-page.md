다음 인자로 새 대시보드 페이지를 추가해주세요: $ARGUMENTS
(형식: <경로> <메뉴명>, 예: users 사용자관리)

1. `app/dashboard/<경로>/page.tsx` 생성
   - `app/dashboard/settings/page.tsx` 패턴을 그대로 따를 것
   - `export const metadata: Metadata = { title: "<메뉴명>" }`
   - 최상단에 `<PageHeader title="<메뉴명>" description="..." />` 배치
   - "use client" 없는 서버 컴포넌트로 작성
   - 콘텐츠가 단순하면 page.tsx에 직접, 복잡하면 components/sections/에 별도 컴포넌트로 분리

2. `lib/site-config.ts`의 `dashboardNav` 배열에 항목 추가
   - `{ title: "<메뉴명>", href: "/dashboard/<경로>", icon: <적절한 lucide-react 아이콘> }`
   - 상단 import 문에 선택한 아이콘 추가

3. `components/layout/app-header.tsx`의 `segmentLabels`에 경로 세그먼트 → 메뉴명 매핑 추가
   - 경로에 여러 단계가 있으면 각 세그먼트를 모두 등록

완료 후 수정/생성된 세 파일을 간단히 요약해주세요.
