import { cn } from "@/lib/utils"

// 공통 최대 너비 + 반응형 좌우 패딩 래퍼
export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  )
}
