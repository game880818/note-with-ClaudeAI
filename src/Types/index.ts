// ── Day 1: 型定義 ─────────────────────────────────────────────────────────
// TODO Day2: AiActionType・AiResult 型を追加する

export type TagColor = 'pink' | 'mint' | 'blue' | 'lemon' | 'lavender'

export interface Tag {
  label: string
  color: TagColor
}

export interface Note {
  id: string
  title: string
  content: string
  tags: Tag[]
  stripeColor: string  // サイドバーの左カラーライン
  createdAt: string    // ISO string
  updatedAt: string    // ISO string
}
