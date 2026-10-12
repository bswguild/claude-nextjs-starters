"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { signupSchema, type SignupValues } from "@/lib/validations/auth"

// 입력 필드 정의 — 배열로 관리해 필드 추가/삭제를 쉽게 함
const fields: {
  name: keyof SignupValues
  label: string
  type: string
  autoComplete: string
}[] = [
  { name: "name", label: "이름", type: "text", autoComplete: "name" },
  { name: "email", label: "이메일", type: "email", autoComplete: "email" },
  {
    name: "password",
    label: "비밀번호",
    type: "password",
    autoComplete: "new-password",
  },
  {
    name: "confirmPassword",
    label: "비밀번호 확인",
    type: "password",
    autoComplete: "new-password",
  },
]

// 회원가입 폼 (React Hook Form + Zod)
export function SignupForm() {
  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  })

  const onSubmit = async (values: SignupValues) => {
    // TODO: 실제 회원가입 API 호출로 교체
    await new Promise((resolve) => setTimeout(resolve, 500))
    toast.success(`${values.name}님, 가입 요청이 처리되었습니다.`)
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>회원가입</CardTitle>
        <CardDescription>정보를 입력해 계정을 만드세요.</CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <CardContent>
          <FieldGroup>
            {fields.map((item) => (
              <Controller
                key={item.name}
                name={item.name}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={`signup-${item.name}`}>
                      {item.label}
                    </FieldLabel>
                    <Input
                      {...field}
                      id={`signup-${item.name}`}
                      type={item.type}
                      autoComplete={item.autoComplete}
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
            ))}
          </FieldGroup>
        </CardContent>
        <CardFooter className="mt-6 flex-col gap-3">
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "처리 중..." : "가입하기"}
          </Button>
          <p className="text-sm text-muted-foreground">
            이미 계정이 있으신가요?{" "}
            <Link href="/login" className="text-foreground underline">
              로그인
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
