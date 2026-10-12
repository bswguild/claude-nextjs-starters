# Next.js 웹 스타터킷

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui + lucide-react 기반의 스타터킷입니다.
레이아웃, 다크 모드, 폼 검증, 토스트가 준비되어 있어 바로 화면 개발을 시작할 수 있습니다.

## 시작하기

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 프로덕션 빌드
npm run lint     # ESLint
```

## 기술 스택

| 용도 | 라이브러리 |
|---|---|
| 프레임워크 | Next.js 16 (App Router, Cache Components), React 19 |
| 스타일 | Tailwind CSS v4, shadcn/ui (`base-nova`, Base UI 기반) |
| 아이콘 | lucide-react |
| 다크 모드 | next-themes |
| 토스트 | sonner |
| 폼 / 검증 | react-hook-form + zod + @hookform/resolvers |
| 훅 / 날짜 | usehooks-ts, date-fns |
| 클래스 유틸 | clsx + tailwind-merge (`cn`) |

## 폴더 구조와 컴포넌트 계층

```
app/
  (marketing)/   랜딩 페이지 (헤더 + 푸터)
  (auth)/        로그인 / 회원가입 (중앙 카드)
  dashboard/     대시보드 (사이드바 + 상단바), 설정
  not-found.tsx, error.tsx
components/
  ui/            [1층] shadcn 컴포넌트 — 직접 수정 최소화
  common/        [2층] 범용 조합 부품 (logo, theme-toggle, user-nav, page-header, empty-state)
  layout/        [3층] 페이지 골격 (header, footer, sidebar, container ...)
  sections/      [4층] 페이지 전용 블록 (hero, features, faq, cta, auth, settings)
  providers/     전역 Provider (테마, 툴팁, 토스트)
lib/             utils(cn), site-config, validations(zod 스키마)
hooks/           use-mobile 등
types/           공용 타입
```

의존 방향은 `ui → common → layout → sections` 순서로만 허용합니다. 아래층은 위층을 import하지 않습니다.

## 자주 하는 작업

- **사이트 이름 / 메뉴 변경**: `lib/site-config.ts`
- **shadcn 컴포넌트 추가**: `npx shadcn@latest add <이름>` (예: `command calendar popover chart pagination progress`)
- **새 대시보드 메뉴**: `dashboardNav`에 항목 추가 후 `app/dashboard/<경로>/page.tsx` 생성, 브레드크럼 이름은 `components/layout/app-header.tsx`의 `segmentLabels`에 등록
- **테마 색상 변경**: `app/globals.css`의 CSS 변수 (`:root`, `.dark`)
- **인증 연동**: `components/sections/auth/*-form.tsx`의 `onSubmit`에서 API 호출로 교체

## 주의사항

- 이 프로젝트는 `cacheComponents`가 켜져 있어 프리렌더 중 `new Date()`, `cookies()` 같은 동적 값을 바로 쓸 수 없습니다. 필요하면 `"use cache"`(예: `components/layout/copyright.tsx`) 또는 Suspense로 분리하세요.
- shadcn `base-nova` 스타일은 Base UI 기반이라 `asChild` 대신 `render` prop을 사용합니다.
  예: `<DropdownMenuItem render={<Link href="/" />}>`
