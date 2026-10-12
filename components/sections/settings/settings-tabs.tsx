"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// 설정 화면 예시: 프로필 / 알림 탭 + 계정 삭제 확인 다이얼로그
export function SettingsTabs() {
  return (
    <Tabs defaultValue="profile" className="max-w-2xl">
      <TabsList>
        <TabsTrigger value="profile">프로필</TabsTrigger>
        <TabsTrigger value="notifications">알림</TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>프로필</CardTitle>
            <CardDescription>공개되는 기본 정보를 수정합니다.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="settings-name">이름</FieldLabel>
                <Input id="settings-name" defaultValue="홍길동" />
              </Field>
              <Field>
                <FieldLabel htmlFor="settings-email">이메일</FieldLabel>
                <Input
                  id="settings-email"
                  type="email"
                  defaultValue="user@example.com"
                />
                <FieldDescription>로그인과 알림에 사용됩니다.</FieldDescription>
              </Field>
            </FieldGroup>
            <Button onClick={() => toast.success("프로필이 저장되었습니다.")}>
              저장
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>알림</CardTitle>
            <CardDescription>알림 수신 방식을 설정합니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field orientation="horizontal">
                <FieldLabel htmlFor="settings-email-noti">이메일 알림</FieldLabel>
                <Switch id="settings-email-noti" defaultChecked />
              </Field>
              <Field>
                <FieldLabel>언어</FieldLabel>
                <Select defaultValue="ko">
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ko">한국어</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>
      </TabsContent>

      <Card className="mt-6 border-destructive/40">
        <CardHeader>
          <CardTitle>위험 구역</CardTitle>
          <CardDescription>계정을 삭제하면 복구할 수 없습니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger
              render={<Button variant="destructive" />}
            >
              계정 삭제
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>정말 삭제하시겠습니까?</AlertDialogTitle>
                <AlertDialogDescription>
                  이 작업은 되돌릴 수 없으며 모든 데이터가 삭제됩니다.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>취소</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => toast.error("계정 삭제 요청이 접수되었습니다.")}
                >
                  삭제
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </Tabs>
  )
}
