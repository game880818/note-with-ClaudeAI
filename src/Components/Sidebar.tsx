// ── Day 1: Sidebar コンポーネント（静的構造のみ）────────────────────────────
// TODO Day2: props を受け取って notes を動的に表示する
// TODO Day2: 検索・タグ絞り込みのロジックを追加する

export function Sidebar() {
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

        {/* アクティブなノート（選択中） */}
        <div className="note-item active">
          <div className="note-stripe" style={{ background: '#F2A7B0' }} />
          <div className="note-title">JLPT N3 — 文法まとめ</div>
          <div className="note-preview">〜ているところ：進行中の動作...</div>
          <div className="note-meta">
            <span className="note-date">5月22日</span>
            <span className="note-tag-mini color-pink" style={{ background: '#FFF0F2', borderColor: '#F2A7B0', color: '#C4596A' }}>
              日本語
            </span>
          </div>
        </div>

        {/* 通常のノート */}
        <div className="note-item">
          <div className="note-stripe" style={{ background: '#8FD0BA' }} />
          <div className="note-title">React hooks まとめ</div>
          <div className="note-preview">useState, useEffect, useCallback...</div>
          <div className="note-meta">
            <span className="note-date">5月21日</span>
            <span className="note-tag-mini" style={{ background: '#EEF8F4', borderColor: '#8FD0BA', color: '#3B8870' }}>
              技術
            </span>
          </div>
        </div>

        <div className="note-item">
          <div className="note-stripe" style={{ background: '#97BEF0' }} />
          <div className="note-title">面接準備メモ</div>
          <div className="note-preview">なぜこの技術を選んだか...</div>
          <div className="note-meta">
            <span className="note-date">5月20日</span>
            <span className="note-tag-mini" style={{ background: '#EDF4FF', borderColor: '#97BEF0', color: '#3A6FB5' }}>
              就活
            </span>
          </div>
        </div>

        <div className="note-item">
          <div className="note-stripe" style={{ background: '#F5D97A' }} />
          <div className="note-title">単語帳 — N3語彙</div>
          <div className="note-preview">財布、電車、約束...</div>
          <div className="note-meta">
            <span className="note-date">5月19日</span>
            <span className="note-tag-mini" style={{ background: '#FFFAE8', borderColor: '#F5D97A', color: '#9A7E2A' }}>
              単語
            </span>
          </div>
        </div>
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
