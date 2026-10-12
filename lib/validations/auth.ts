import { z } from "zod"

// 로그인 폼 스키마
export const loginSchema = z.object({
  email: z.email("올바른 이메일 형식이 아닙니다."),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
})

// 회원가입 폼 스키마 (비밀번호 확인 일치 검증 포함)
export const signupSchema = z
  .object({
    name: z.string().min(2, "이름은 2자 이상이어야 합니다."),
    email: z.email("올바른 이메일 형식이 아닙니다."),
    password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  })

export type LoginValues = z.infer<typeof loginSchema>
export type SignupValues = z.infer<typeof signupSchema>
