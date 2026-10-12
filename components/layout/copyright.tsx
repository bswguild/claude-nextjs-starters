import { siteConfig } from "@/lib/site-config"

// 저작권 문구 — cacheComponents 환경에서 new Date()를 쓰기 위해 캐시 처리
export async function Copyright() {
  "use cache"

  return (
    <>
      © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
    </>
  )
}
