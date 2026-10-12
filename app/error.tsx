"use client"

import { TriangleAlert } from "lucide-react"

import { EmptyState } from "@/components/common/empty-state"
import { Button } from "@/components/ui/button"

// 런타임 에러 경계 — reset으로 재시도
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <EmptyState
        icon={TriangleAlert}
        title="문제가 발생했습니다"
        description="잠시 후 다시 시도해 주세요."
        action={
          <Button size="sm" onClick={reset}>
            다시 시도
          </Button>
        }
      />
    </div>
  )
}
