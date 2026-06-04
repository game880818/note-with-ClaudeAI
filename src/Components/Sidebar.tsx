// ── Day 1: Sidebar コンポーネント（静的構造のみ）────────────────────────────
// TODO Day2: props を受け取って notes を動的に表示する
// TODO Day2: 検索・タグ絞り込みのロジックを追加する
import type { Note } from "../Types"
import { formalDateJa } from "../utils/formalTime"
interface sidebarProps {
  notes: Note[]
  activeId: string | null
  handleSelect: (id: string | null) => void
}

export function Sidebar({ notes, activeId, handleSelect }: sidebarProps) {
  return (
    <aside className="sidebar">

      {/* ── ブランドロゴ ── */}
      <div className="sidebar-top">
        <div className="brand">
          <div className="brand-dot" />
          <span className="brand-name">note.ai ✿</span>
        </div>

        {/* 検索ボックス（見た目のみ・Day2で機能追加） */}
        <div className="search-box">
          <span>🔍</span>
          <span>検索する...</span>
        </div>

        {/* タグフィルター（見た目のみ・Day2で機能追加） */}
        <div className="section-label">タグ · Tags</div>
        <div className="tag-filter">
          <span className="tag-chip color-pink">すべて</span>
          <span className="tag-chip color-pink">日本語</span>
          <span className="tag-chip color-mint">JLPT</span>
          <span className="tag-chip color-blue">文法</span>
          <span className="tag-chip color-lemon">単語</span>
        </div>
      </div>

      {/* ── ノートリスト（ダミーデータ） ── */}
      {/* TODO Day2: notes.map() で動的に描画する */}
      <div className="note-list">
        <div className="section-label" style={{ padding: '6px 2px 4px' }}>
          最近のノート
        </div>

        {/* 通常のノート */}
        {notes.map(item => (
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
      {/* TODO Day2: onClick で新規ノートを作成する */}
      <div className="sidebar-foot">
        <button className="btn-new">
          ＋ 新しいノートを作成
        </button>
      </div>

    </aside>
  )
}
