// ── Day 1: App（静的シェル）──────────────────────────────────────────────────
// 現在は全コンポーネントをただ並べているだけ。
//
// TODO Day2 でここに追加するもの：
//   const [notes, setNotes]       = useState<Note[]>(SEED_NOTES)
//   const [activeId, setActiveId] = useState<string | null>(notes[0].id)
//   → notes・activeId を各コンポーネントに props で渡す
//   → localStorage の読み書き（useEffect）
//   → handleNew / handleDelete / handleChange 関数
//
// TODO Day3 でここに追加するもの：
//   const [aiOpen, setAiOpen] = useState(true)
//   → aiOpen を Topbar・AiPanel に渡す

import type { Note } from './Types'
import { Sidebar } from './Components/Sidebar'
import { Topbar } from './Components/Topbar'
import { Editor } from './Components/Editor'
import { AiPanel } from './Components/AiPanel'
import { useState } from 'react'

// 画面確認用のダミーデータ
const SEED: Note[] = [
  {
    id: '1',
    title: 'JLPT N3 — 文法まとめ',
    content: '〜ているところ：進行中の動作\n例：今、勉強しているところです。',
    tags: [{ label: '日本語', color: 'pink' }],
    stripeColor: '#F2A7B0',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'React hooks まとめ',
    content: 'useEffect・useState・useCallback',
    tags: [{ label: '技術', color: 'mint' }],
    stripeColor: '#8FD0BA',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export default function App() {
  const [notes, setNotes] = useState<Note[]>(SEED)
  const [activeId, setActiveId] = useState<string | null>(SEED[0].id)

  const activeNote = notes.find(item => item.id === activeId) ?? null
  return (
    <div className="app">
      <Sidebar
        notes={notes}
        activeId={activeId}
      />
      <Topbar />
      <Editor />
      <AiPanel />
    </div>
  )
}
