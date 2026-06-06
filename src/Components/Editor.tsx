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
      <div className="tags-row">
        <span className="tags-row-label">タグ :</span>

        {note?.tags?.map(tag => (
          <span className={`edit-tag ${tag.color ? `color-${tag.color}` : ''}`} key={tag.label}>
            {tag.label}
            {/* TODO Day2: クリックでタグを削除できるようにする */}
            <button className="tag-remove-btn">×</button>
          </span>
        ))}


        {/* TODO Day2: Enter キーでタグを追加する input */}
        <input
          className="tag-add-input"
          name="tag"
          placeholder="+ 追加..."
        />
      </div>

      {/* ── タイトル入力 ── */}
      {/* TODO Day2: value={note.title} onChange={...} を追加する */}
      <input
        className="title-input"
        name="title"
        value={note?.title}
        onChange={(e) => onChange({ title: e.target.value })}
        placeholder="タイトルを入力..."
      />

      {/* タイトル下のアクセントライン */}
      <div className="title-underline" />

      {/* ── 本文エリア ── */}
      {/* TODO Day2: value={note.content} onChange={...} を追加する */}
      <div className="content-scroll">
        <textarea
          className="content-textarea"
          name="content"
          value={note?.content}
          onChange={(e) => onChange({ content: e.target.value })}
          placeholder="ここにメモを入力してください..."
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
