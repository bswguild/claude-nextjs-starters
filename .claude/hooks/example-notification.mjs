#!/usr/bin/env node
// Notification 훅 테스트/학습용 예제 — Claude Code가 훅에 실제로 넘기는 JSON을
// 그대로 로컬 로그 파일에 쌓아서, 받는 데이터 구조를 눈으로 확인할 수 있게 한다.

import { appendFileSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const logPath = join(dirname(fileURLToPath(import.meta.url)), "example-notification.log")

function readStdin() {
  try {
    return readFileSync(0, "utf-8")
  } catch {
    return ""
  }
}

const raw = readStdin().trim()
const timestamp = new Date().toISOString()
const entry = raw
  ? JSON.stringify({ timestamp, payload: safeParse(raw) })
  : JSON.stringify({ timestamp, payload: null, raw: "(빈 입력)" })

function safeParse(text) {
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

try {
  appendFileSync(logPath, entry + "\n", "utf-8")
} catch (error) {
  console.error(`[example-notification] 로그 기록 실패: ${error instanceof Error ? error.message : error}`)
}
