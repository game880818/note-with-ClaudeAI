import type { Note } from "../Types"
import { useState } from 'react'
import { formalDateJa } from "../utils/formalTime"
interface sidebarProps {
  notes: Note[]
  activeId: string | null
  handleSelect: (id: string) => void
  handleNew: () => void
}

import supabase from "../../lib/supabase"

export function Sidebar({ notes, activeId, handleSelect, handleNew }: sidebarProps) {
  const [searchText, setSearchText] = useState<string>('')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  async function addNoteTest() {
    const { data: { user } } = await supabase.auth.getUser()
    console.log(user?.id)
    await supabase.from('notes').insert({
      user_id: user?.id,
      title: 'テスト',
      content: 'テスト内容',
    })
    console.log('作成完了');
  }
  async function readNoteTest() {
    const { data, error } = await supabase
      .from('notes')
      .select('*')

    console.log(data, error, '取得完了');
  }

  // 全てのタグを取得　（重複を排除）
  // 1. 全てのタグを展開して 2. Map で重複を排除する 3.values() で値を取得する 4. Array.from() でイテレータという特殊な状態を配列に変換する
  const allTags = Array.from(
    new Map(
      notes.flatMap(note => note.tags).map(tag => [tag.label, tag])
    ).values()
  )

  // 検索 + タグで絞り込む
  const filteredNotes = notes.filter(note => {
    const currentSearch = !searchText || note.title.includes(searchText) || note.content.includes(searchText)
    const currentTag = !activeTag || note.tags.some(tag => tag.label === activeTag)
    return currentSearch && currentTag
  })
  return (
    <aside className="sidebar">

      {/* ── ロゴ ── */}
      <div className="sidebar-top">
        <div className="brand">
          <div className="brand-dot" />
          <span className="brand-name">note.ai ✿</span>
        </div>

        {/* 検索ボックス */}
        <div className="search-box">
          <span>🔍</span>
          <input
            placeholder="検索する..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          ></input>
        </div>

        {/* タグフィルター */}
        <div className="section-label">タグ · Tags</div>
        {/* タグフィルターのボタン null === 全て */}
        <div className="tag-filter">
          <span
            className={`tag-chip ${!activeTag ? 'color-pink' : ''}`}
            onClick={() => setActiveTag(null)}
          >すべて</span>
          {/* タグフィルターのボタン 具体のタグ */}
          {allTags.map(tag => (
            <span
              key={tag.label}
              className={`tag-chip ${activeTag === tag.label ? `color-${tag.color}` : ''}`}
              onClick={() => setActiveTag(activeTag === tag.label ? null : tag.label)}
            >
              {tag.label}
            </span>
          ))}
        </div>
      </div>

      {/* ── ノートリスト（ダミーデータ） ── */}
      <div className="note-list">
        <div className="section-label" style={{ padding: '6px 2px 4px' }}>
          最近のノート
        </div>

        {/* 通常のノート */}
        {filteredNotes.map(item => (
          <div
            key={item.id}
            className={`note-item ${item.id === activeId ? 'active' : ''}`}
            onClick={() => handleSelect(item.id)}
          >
            <div className="note-stripe" style={{ background: item.stripeColor }} />
            <div className="note-title">{item.title || '無題のノート'}</div>
            <div className="note-preview">{item.content.slice(0, 50) || '空のノート'}</div>
            <div className="note-meta">
              <span className="note-date">{formalDateJa(item.updatedAt)}</span>
              {item.tags.length > 0 && (
                <span className={`note-tag-mini color-${item.tags[0].color}`}>
                  {item.tags[0].label}</span>
              )}
            </div>
          </div>
        ))}

      </div>

      {/* ── フッター ── */}
      <div className="sidebar-foot">
        <button className="btn-new" onClick={handleNew}>
          ＋ 新しいノートを作成
        </button>
      </div>
      <div className="sidebar-foot">
        <button className="btn-new" onClick={addNoteTest}>
          ＋ テスト用ノートを作成
        </button>
      </div>
      <div className="sidebar-foot">
        <button className="btn-new" onClick={readNoteTest}>
          ＋ テスト用ノートを取得する
        </button>
      </div>

    </aside>
  )
}
