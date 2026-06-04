// ── Day 1: Topbar コンポーネント（静的構造のみ）────────────────────────────
// TODO Day2: props で title・updatedAt を受け取る
// TODO Day3: AI パネルの開閉ボタンを機能させる

export function Topbar() {
  return (
    <header className="topbar">

      {/* ノートタイトル（Day2で props.title に置き換え） */}
      <span className="topbar-title">
        JLPT N3 — 文法まとめ ✍︎
      </span>

      {/* 更新日時（Day2で props.updatedAt に置き換え） */}
      <span className="topbar-date">2025年5月22日</span>

      {/* AI パネル開閉ボタン（Day3で onClick を追加） */}
      <button className="icon-btn active" aria-label="AIパネル">
        ✦
      </button>

      {/* 削除ボタン（Day2で onClick を追加） */}
      <button className="icon-btn" aria-label="削除">
        🗑
      </button>

    </header>
  )
}
