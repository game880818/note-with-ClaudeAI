// ── Day 1: Topbar コンポーネント（静的構造のみ）────────────────────────────
// TODO Day2: props で title・updatedAt を受け取る
// TODO Day3: AI パネルの開閉ボタンを機能させる

import { formalFullTimeJa } from "../utils/formalTime"

interface topbarProps {
  title: string
  updatedAt: string
  onDelete: () => void
  hasNote: boolean
}

export function Topbar({ title, updatedAt, onDelete, hasNote }: topbarProps) {
  return (
    <header className="topbar">

      <span className="topbar-title">
        {title || '無題のノート'}{title ? ' ✍︎' : ''}
      </span>

      <span className="topbar-date">{formalFullTimeJa(updatedAt)}</span>

      {/* AI パネル開閉ボタン（Day3で onClick を追加） */}
      <button className="icon-btn active" aria-label="AIパネル" title="AIアシスタント">
        ✦
      </button>

      {/* ノートがある場合のみ表示する */}
      {hasNote &&
        <button
          className="icon-btn"
          aria-label="削除"
          onClick={onDelete}
          title="削除"
        >
          🗑
        </button>}

    </header>
  )
}
