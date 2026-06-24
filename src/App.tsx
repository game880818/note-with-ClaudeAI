// TODO Day3 でここに追加するもの：
//   const [aiOpen, setAiOpen] = useState(true)
//   → aiOpen を Topbar・AiPanel に渡す

import type { Note } from './Types'

import { Sidebar } from './Components/Sidebar'
import { Topbar } from './Components/Topbar'
import { Editor } from './Components/Editor'
import { AiPanel } from './Components/AiPanel'

import supabase from '../lib/supabase'
import type { Session } from '@supabase/supabase-js'

import { useCallback, useEffect, useState } from 'react'

// 画面確認用のダミーデータ
/*const SEED: Note[] = [
  {
    id: '1',
    title: 'JLPT N3 — 文法まとめ',
    content: '〜ているところ：進行中の動作\n例：今、勉強しているところです。',
    tags: [{ label: '日本語', color: 'pink' }],
    stripe_color: '#F2A7B0',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
] */


export default function App() {
  // ログイン状態を管理する state
  const [session, setSession] = useState<Session | null>(null)

  // ノートを管理する state
  const [notes, setNotes] = useState<Note[]>([])

  // 選択しているノートを管理する state
  const [activeId, setActiveId] = useState<string | null>(null)

  // AI パネルの開閉状態を管理する state
  const [aiOpen, setAiOpen] = useState(true)

  // 選択しているノートを返す
  const activeNote = notes.find(item => item.id === activeId) ?? null

  // ロード中を管理する state
  const [loading, setLoading] = useState(false)
  // エラーを管理する state
  const [error, setError] = useState<Error | null>(null)

  // ログイン状態を取得する useEffect
  useEffect(() => {
    // 即座に session を取得 → ボタンの遅延がなくなる
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))

    // ログイン状態が変化したときの処理
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log(_event, session)
      setSession(session)
    })

    // クリーンアップ
    return () => data.subscription.unsubscribe()
  }, [])

  // notes を supabase から取得する useEffect
  useEffect(() => {
    if (!session) return         // 未ログインなら何もしない

    async function fetchSavedNotes() {
      // ロード中を表示 & エラーをリセット
      setLoading(true)
      setError(null)

      // notes を取得
      const { data, error } = await supabase
        .from('notes')
        .select()
        .order('updated_at', { ascending: false })

      // エラーを処理
      if (error) {
        console.error('Error fetching notes:', error)
        setLoading(false)
        setError(error)
        return
      }
      // 成功時処理
      setLoading(false)
      setNotes(data ?? [])
      setActiveId(data?.[0]?.id ?? null)
    }
    fetchSavedNotes()
  }, [])

  // ノートを更新する useEffect
  useEffect(() => {
    if (!activeId) return        // activeId が null なら何もしない
    if (!session) return         // 未ログインなら何もしない

    const timer = setTimeout(async () => {
      const { error } = await supabase.from('notes')
        .update({
          title: activeNote?.title,
          content: activeNote?.content,
          tags: activeNote?.tags,
          updated_at: new Date().toISOString(),
        })
        .eq('id', activeId)

      if (error) {
        console.error('Error updating note:', error)
        setError(error)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [activeNote?.title, activeNote?.content, activeNote?.tags])

  // 新しいノートを作成するときの処理
  async function handleNew() {
    if (!session) return         // 未ログインなら何もしない

    // 新しいノートを作成
    const { data: newNoteData, error } = await supabase
      .from('notes')
      .insert({
        user_id: session?.user?.id,
        title: '',
        content: '',
        tags: [],
        stripe_color: '#F2A7B0',
      })
      .select()
      .single()

    // エラーを処理
    if (error) {
      console.error('Error inserting note:', error)
      setError(error)
      return
    }
    // 成功時処理
    setNotes([newNoteData, ...notes])
    setActiveId(newNoteData.id)
  }

  // ノートを削除するときの処理
  async function handleDelete(id: string) {
    // 確認ダイアログを出す
    if (!window.confirm('このノートを削除しますか？')) return

    // データベースの削除
    const { error } = await supabase.from('notes').delete().eq('id', id)

    if (error) {
      console.error('Error deleting note:', error)
      setError(error)
      return
    }

    // フロントエンドの削除
    const newNotes = notes.filter(note => note.id !== id)
    setNotes(newNotes)
    setActiveId(newNotes[0]?.id ?? null)
  }

  // フロントエンドのノートを更新するときの処理
  // useCallback で memo化する activeId が変化したときのみ再実行
  const handleChange = useCallback((field: Partial<Note>) => {
    setNotes((prevNotes) => {
      // 選択しているノートを探し出し、更新
      const newNotes = prevNotes.map(note => note.id === activeId ? { ...note, ...field, updated_at: new Date().toISOString() } : note)
      return newNotes
    })
  }, [activeId])

  // Sidebar からノートを選択したときの処理
  function handleSelect(id: string) {
    setActiveId(id)
  }

  // ── return Component ────────────────────────────────────────────────────────────────
  // ロード中を表示
  if (loading) {
    return <div className="app-loading"><p>読み込み中...</p></div>
  }

  // エラーを表示
  // if (error) {
  //   return (
  //     <div className="app-error">
  //       <p>データの読み込みに失敗しました</p>
  //       <button onClick={() => window.location.reload()}>再試行</button>
  //     </div>
  //   )
  // }

  return (
    <div className="app">
      <Sidebar
        notes={notes}
        activeId={activeId}
        handleSelect={handleSelect}
        handleNew={handleNew}
      />
      <Topbar
        title={activeNote?.title ?? ''}
        updatedAt={activeNote?.updated_at ?? ''}
        aiOpen={aiOpen}
        onAiToggle={() => setAiOpen(status => !status)}
        onDelete={() => activeId && handleDelete(activeId)}
        hasNote={activeNote !== null}
        session={session}
      />

      {/* Editor or empty state */}
      {activeNote ? (
        <Editor
          note={activeNote}
          onChange={handleChange}
        />
      ) : (
        <div className="editor-wrap">
          <div className="no-note">
            <div className="no-note-flower">✿</div>
            <p className="no-note-text">
              ノートを選択するか<br />新しいノートを作成してください
            </p>
            <button className="btn-new" style={{ width: 180 }} onClick={handleNew}>
              ＋ 新しいノートを作成
            </button>
          </div>
        </div>
      )}
      {aiOpen &&
        <AiPanel
          content={activeNote?.content ?? ''}
          onClose={() => setAiOpen(false)}
        />
      }
    </div>
  )
}
