// ── Day 1: Editor コンポーネント（静的構造のみ）────────────────────────────
// TODO Day2: props で note・onChange を受け取る
// TODO Day2: タグの追加・削除ロジックを実装する
// TODO Day2: 字数カウントを動的にする
import { Note } from '../Types';

interface EditorProps {
  note: Note | null
  // Partial<Note> は Note の一部を更新できるようにする
  // 例えば、title を更新する場合は、{ title: '新しいタイトル' } を渡す
  onChange: (field: Partial<Note>) => void
}

export function Editor({ note, onChange }: EditorProps) {
  return (
    <div className="editor-wrap">

      {/* ── タグ編集行 ── */}
      {/* TODO Day2: note.tags.map() で動的に描画する */}
      <div className="tags-row">
        <span className="tags-row-label">タグ :</span>

        <span className="edit-tag color-pink">
          日本語
          {/* TODO Day2: クリックでタグを削除できるようにする */}
          <button className="tag-remove-btn">×</button>
        </span>

        <span className="edit-tag color-mint">
          JLPT
          <button className="tag-remove-btn">×</button>
        </span>

        {/* TODO Day2: Enter キーでタグを追加する input */}
        <input
          className="tag-add-input"
          placeholder="+ 追加..."
          readOnly
        />
      </div>

      {/* ── タイトル入力 ── */}
      {/* TODO Day2: value={note.title} onChange={...} を追加する */}
      <input
        className="title-input"
        placeholder="タイトルを入力..."
        defaultValue="JLPT N3 — 文法まとめ"
        readOnly
      />

      {/* タイトル下のアクセントライン */}
      <div className="title-underline" />

      {/* ── 本文エリア ── */}
      {/* TODO Day2: value={note.content} onChange={...} を追加する */}
      <div className="content-scroll">
        <textarea
          className="content-textarea"
          placeholder="ここにメモを入力してください..."
          defaultValue={
            '【進行形の表現】\n〜ているところ — 動作が進行中であることを表す。\n例：今、勉強しているところです。\n\n【完了・後悔】\n〜てしまう — 完了、または残念な気持ちを表す。\n例：財布を忘れてしまった。\n\n【反事実・仮定】\n〜ばよかった — 後悔を表す表現。\n例：もっと早く起きればよかった。'
          }
          readOnly
        />
      </div>

      {/* ── ステータスバー ── */}
      {/* TODO Day2: 字数・文字数を動的に計算する */}
      <div className="statusbar">
        <span className="stat-item">✎ 42 語</span>
        <span className="stat-item">◌ 98 文字</span>
        <div className="kbd-hint">
          <kbd>Enter</kbd>
          <span>でタグを追加</span>
        </div>
      </div>

    </div>
  )
}
