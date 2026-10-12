import Link from "next/link"
import { FileQuestion } from "lucide-react"

import { EmptyState } from "@/components/common/empty-state"
import { buttonVariants } from "@/components/ui/button"

// 404 페이지
export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <EmptyState
        icon={FileQuestion}
        title="페이지를 찾을 수 없습니다"
        description="주소가 올바른지 확인해 주세요."
        action={
          <Link href="/" className={buttonVariants({ size: "sm" })}>
            홈으로 이동
          </Link>
        }
      />
    </div>
  )
}
