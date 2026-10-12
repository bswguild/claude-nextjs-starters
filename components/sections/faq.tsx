import { Container } from "@/components/layout/container"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// FAQ 데이터
const faqs = [
  {
    question: "새 shadcn 컴포넌트는 어떻게 추가하나요?",
    answer: "`npx shadcn@latest add <컴포넌트명>` 명령으로 components/ui에 추가됩니다.",
  },
  {
    question: "사이트 이름과 메뉴는 어디서 바꾸나요?",
    answer: "lib/site-config.ts 한 곳에서 사이트 정보와 내비게이션을 관리합니다.",
  },
  {
    question: "실제 로그인 기능이 포함되어 있나요?",
    answer: "UI와 폼 검증만 포함되어 있으며, 인증 API 연동은 onSubmit에서 구현하세요.",
  },
]

// 자주 묻는 질문 섹션
export function Faq() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-3xl space-y-8">
        <h2 className="text-center text-3xl font-bold tracking-tight">
          자주 묻는 질문
        </h2>
        <Accordion>
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  )
}
