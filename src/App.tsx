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

import { Sidebar } from './Components/Sidebar'
import { Topbar } from './Components/Topbar'
import { Editor } from './Components/Editor'
import { AiPanel } from './Components/AiPanel'

export default function App() {
  return (
    <div className="app">
      <Sidebar />
      <Topbar />
      <Editor />
      <AiPanel />
    </div>
  )
}
