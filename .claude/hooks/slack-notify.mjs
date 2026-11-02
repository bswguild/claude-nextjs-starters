#!/usr/bin/env node
// Claude Code 훅 이벤트(권한 요청 / 작업 완료)를 Slack Incoming Webhook으로 전달한다.
// 웹훅 URL이 없거나 전송에 실패해도 Claude Code 동작을 막지 않도록 항상 exit 0으로 종료한다.

import { readFileSync } from "node:fs"

function readStdin() {
  try {
    return readFileSync(0, "utf-8")
  } catch {
    return ""
  }
}

function formatKoreanTimestamp(date) {
  const pad = (value) => String(value).padStart(2, "0")
  return `${date.getFullYear()}년 ${pad(date.getMonth() + 1)}월 ${pad(date.getDate())}일 ${pad(date.getHours())}시 ${pad(date.getMinutes())}분 ${pad(date.getSeconds())}초`
}

function buildMessage(payload) {
  const projectDir = payload.cwd ?? process.cwd()
  const projectName = projectDir.split(/[\\/]/).filter(Boolean).pop() ?? projectDir
  const eventName = payload.hook_event_name ?? "알 수 없음"

  const header =
    eventName === "Notification"
      ? "🔔 권한 요청"
      : eventName === "Stop"
        ? "✅ 작업 완료 알림"
        : `ℹ️ ${eventName}`

  const status = eventName === "Notification" && payload.message ? payload.message : eventName

  return [
    header,
    `프로젝트 : ${projectName}`,
    `상태 : ${status}`,
    `시간 : ${formatKoreanTimestamp(new Date())}`,
  ].join("\n")
}

async function main() {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL
  if (!webhookUrl) {
    console.error("[slack-notify] SLACK_WEBHOOK_URL이 설정되지 않아 전송을 건너뜁니다.")
    return
  }

  let payload = {}
  try {
    payload = JSON.parse(readStdin())
  } catch {
    // 훅 입력이 비어있거나 JSON이 아니어도 무시하고 계속 진행한다.
  }

  const text = buildMessage(payload)
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 5000)

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
      signal: controller.signal,
    })
    if (!response.ok) {
      console.error(`[slack-notify] Slack 응답 오류: ${response.status}`)
    }
  } catch (error) {
    console.error(`[slack-notify] 전송 실패: ${error instanceof Error ? error.message : error}`)
  } finally {
    clearTimeout(timeout)
  }
}

main().catch((error) => {
  console.error(`[slack-notify] 처리 중 오류: ${error instanceof Error ? error.message : error}`)
})
