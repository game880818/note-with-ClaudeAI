# note.ai ✿ — Day 1 静的版

韓系 aesthetic デザインの学習ノートアプリ。
**Day 1 の静的構造のみ** — 機能はあなたが自分で実装してください！

## 起動方法

```bash
npm install
npm run dev
```

## ファイル構成

```
src/
├── types.ts       # 型定義（Note・Tag）
├── index.css      # 全スタイル（触らなくて OK）
├── App.tsx        # ← ここに state を追加していく
├── Sidebar.tsx    # ← ノートリストの動的化
├── Topbar.tsx     # ← タイトル・日付を props 化
├── Editor.tsx     # ← 入力・タグ編集を動かす
└── AiPanel.tsx    # ← Day3 で AI 接続
```

## Day 2 でやること（機能実装）

- [ ] `App.tsx` に `useState` で `notes`・`activeId` を追加
- [ ] `handleNew` / `handleDelete` / `handleChange` 関数を作る
- [ ] `localStorage` に保存・読み込み（`useEffect`）
- [ ] `Sidebar` にキーワード検索・タグ絞り込みを追加
- [ ] `Editor` のタグ追加・削除（`Enter` キー対応）
- [ ] 字数・文字数を動的にカウント

## Day 3 でやること（AI 接続）

- [ ] `axios` をインストールして `utils/ai.ts` を作成
- [ ] `.env` に `VITE_ANTHROPIC_API_KEY` を追加
- [ ] `AiPanel` の各ボタンに `onClick` を実装
- [ ] `loading` / `error` の state を追加

## ヒント

各ファイルの `// TODO Day2:` コメントを手がかりに実装してみてください。
わからなくなったら Claude に「〇〇の実装方法を教えて」と聞きましょう！
