// TODO Day3: AI パネルの開閉ボタンを機能させる
import { formalFullTimeJa } from "../utils/formalTime"
import supabase from "../../lib/supabase"
import type { Session } from "@supabase/supabase-js"

interface topbarProps {
  title: string
  updatedAt: string
  aiOpen: boolean
  onAiToggle: () => void
  onDelete: () => void
  hasNote: boolean
  session: Session | null
}

export function Topbar({ title, updatedAt, aiOpen, onAiToggle, onDelete, hasNote, session }: topbarProps) {

  // Google ログインボタンを押したときの処理
  async function handleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  }
  // ログアウトボタンを押したときの処理
  async function handleLogout() {
    await supabase.auth.signOut()
    window.location.reload()
  }

  return (
    <header className="topbar">

      <span className="topbar-title">
        {title || '無題のノート'}{title ? ' ✍︎' : ''}
      </span>

      <span className="topbar-date">{formalFullTimeJa(updatedAt)}</span>

      {/* AI パネル開閉ボタン*/}
      <button className={aiOpen ? 'icon-btn active' : 'icon-btn'} aria-label="AIパネル" title="AIアシスタント" onClick={onAiToggle}>
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

      {session ? (
        <button className="topbar-auth-btn" onClick={handleLogout} >
          ログアウト
        </button>
      ) : (
        <button className="topbar-auth-btn login" onClick={handleLogin} >
          Googleでログイン
        </button>
      )}

    </header>
  )
}
