# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui(`base-nova`, Base UI 기반) + lucide-react로 구성된 웹 스타터킷. 레이아웃, 다크 모드, 폼 검증, 토스트가 미리 갖춰져 있다.

> `next.config.ts`에서 `experimental.agentFeedback: true`가 켜져 있어 `next dev`가 `AGENTS.md`를 자동으로 재생성한다. `AGENTS.md`의 지시(이 Next.js 버전은 학습 데이터와 다른 breaking change가 있으므로 코드 작성 전 `node_modules/next/dist/docs/`의 해당 가이드를 먼저 읽을 것)를 반드시 따른다.

## 명령어

```bash
npm install
npm run dev      # 개발 서버, http://localhost:3000
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # ESLint 전체 검사 (eslint-config-next core-web-vitals + typescript)
```

- 단일 파일만 검사: `npx eslint <path>`
- 테스트 스크립트/프레임워크는 아직 구성되어 있지 않다 (`package.json`에 `test` 스크립트 없음).

## 아키텍처

### 컴포넌트 계층과 의존 방향

```
components/
  ui/          [1층] shadcn/ui 원본 컴포넌트 — 직접 수정 최소화
  common/      [2층] 범용 조합 부품 (logo, theme-toggle, user-nav, page-header, empty-state)
  layout/      [3층] 페이지 골격 (site-header/footer, app-header/sidebar, container, copyright ...)
  sections/    [4층] 페이지 전용 블록 (hero, features, faq, cta, auth/*, settings/*)
  providers/   전역 Provider 묶음
```

의존 방향은 `ui → common → layout → sections` 한 방향으로만 허용한다. 아래층(`ui`)은 위층(`common` 이상)을 import하지 않는다. 새 컴포넌트를 만들 때는 이 계층 중 어디에 속하는지 먼저 판단한다.

### 라우트 구조

- `app/(marketing)/` — 랜딩 페이지, 자체 레이아웃(헤더+푸터)
- `app/(auth)/` — 로그인·회원가입, 중앙 카드 레이아웃. 폼은 `components/sections/auth/*-form.tsx`에 있으며 실제 인증 API 연동 없이 `onSubmit` 안에 TODO로 스텁 처리되어 있다.
- `app/dashboard/` — `SidebarProvider` + `AppSidebar` + `SidebarInset`/`AppHeader` 조합의 대시보드 셸. 새 메뉴 추가 시 `lib/site-config.ts`의 `dashboardNav`에 항목을 넣고 `app/dashboard/<경로>/page.tsx`를 생성한 뒤, `components/layout/app-header.tsx`의 `segmentLabels`에 브레드크럼 표시 이름을 등록해야 한다.

### 전역 설정과 Provider

- `lib/site-config.ts` — 사이트명/설명/URL과 `mainNav`, `dashboardNav`, `dashboardFooterNav` 메뉴 정의. 사이트 정보나 메뉴를 바꿀 때 가장 먼저 보는 파일.
- `components/providers/index.tsx` — `ThemeProvider`(next-themes) + `TooltipProvider` + `Toaster`(sonner)를 하나로 묶어 `app/layout.tsx`에서 감싼다.

### cacheComponents 제약

`next.config.ts`에 `cacheComponents: true`가 켜져 있어, 프리렌더 중 `new Date()`, `cookies()` 같은 동적 값을 컴포넌트에서 바로 사용할 수 없다. 이런 값이 필요하면 `"use cache"` 지시어를 쓰거나(예: `components/layout/copyright.tsx`) Suspense 경계로 분리해야 한다.

### shadcn/ui: Base UI 기반 (`render` prop)

`components.json`의 스타일은 `base-nova`이며 Radix가 아닌 **Base UI** 기반이다. 슬롯 합성 시 Radix의 `asChild` 대신 **`render` prop**을 쓴다. 예: `<DropdownMenuItem render={<Link href="/" />}>`, `<BreadcrumbLink render={<Link href={href} />}>`. 새 shadcn 컴포넌트는 `npx shadcn@latest add <이름>`으로 추가한다.

### 클래스 유틸(`cn`)

`lib/utils.ts`의 `cn()`은 `clsx` + `tailwind-merge`로 직접 구현한 것이며, 모든 `components/ui/*`와 나머지 컴포넌트는 `@/lib/utils`에서 `cn`을 import한다. `package.json`에는 `cn`이라는 별도 npm 패키지도 의존성으로 남아 있지만 코드에서는 사용하지 않는다 — 새 코드에서도 `@/lib/utils`의 `cn`을 사용한다.

### 폼 검증

`react-hook-form` + `zod` + `@hookform/resolvers`로 폼을 구성한다. 스키마는 `lib/validations/`(예: `auth.ts`)에 모아두고, 폼 컴포넌트에서 `zodResolver(schema)`로 연결한다.

### 경로 별칭

`@/*`는 저장소 루트를 가리킨다(`tsconfig.json`). shadcn 관련 별칭(`@/components`, `@/components/ui`, `@/lib`, `@/lib/utils`, `@/hooks`)은 `components.json`에 정의되어 있다.
