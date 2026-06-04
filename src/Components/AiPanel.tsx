// ── Day 1: AiPanel コンポーネント（静的構造のみ）───────────────────────────
// TODO Day3: props で content を受け取る
// TODO Day3: runAiAction() を呼び出して結果を表示する
// TODO Day3: loading・error の state を追加する

export function AiPanel() {
  return (
    <aside className="ai-panel">

      {/* ── ヘッダー ── */}
      <div className="ai-head">
        <div className="ai-title">
          <span>✦</span>
          AIアシスタント
        </div>
        {/* TODO Day3: onClick で AI パネルを閉じる */}
        <button className="icon-btn" aria-label="閉じる">✕</button>
      </div>

      {/* ── アクションボタン群 ── */}
      {/* TODO Day3: onClick で runAiAction() を呼び出す */}
      <div className="ai-actions">
        <div className="ai-section-label">機能を選択</div>

        <button className="ai-action-btn">
          <span className="ai-btn-icon">🇯🇵</span>
          日本語に翻訳
          <span className="ai-badge">→JA</span>
        </button>

        <button className="ai-action-btn">
          <span className="ai-btn-icon">🌍</span>
          英語に翻訳
          <span className="ai-badge">→EN</span>
        </button>

        <button className="ai-action-btn">
          <span className="ai-btn-icon">📋</span>
          ノートを要約
          <span className="ai-badge">AI</span>
        </button>

        <button className="ai-action-btn">
          <span className="ai-btn-icon">✏️</span>
          文法チェック
          <span className="ai-badge">JA</span>
        </button>
      </div>

      {/* ── 結果エリア ── */}
      {/* TODO Day3: AI の結果カードをここに動的に表示する */}
      <div className="ai-results">
        <div className="ai-empty">
          <div className="ai-empty-icon">✨</div>
          <p className="ai-empty-text">
            ボタンをクリックすると<br />結果がここに表示されます
          </p>
        </div>
      </div>

    </aside>
  )
}
