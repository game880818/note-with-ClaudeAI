import type { AiActionType } from '../utils/ai'

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
  stripe_color: string  // サイドバーの左カラーライン
  created_at: string    // ISO string
  updated_at: string    // ISO string
}

// 結果カードの型
export interface AiResult {
  action: AiActionType
  content: string
  dotColor: string
  timestamp: string
}