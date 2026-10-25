import type { Metadata } from "next"

import { EmptyState } from "@/components/common/empty-state"
import { PageHeader } from "@/components/common/page-header"

export const metadata: Metadata = { title: "사용자관리" }

export default function UsersPage() {
  return (
    <>
      <PageHeader title="사용자관리" description="등록된 사용자를 조회하고 관리합니다." />
      <EmptyState title="등록된 사용자가 없습니다" description="사용자가 추가되면 이곳에 표시됩니다." />
    </>
  )
}
