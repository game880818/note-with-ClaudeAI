# 📝 note.ai — AI アシスト付きノートアプリ

> **Claude AI API** を活用したスマートノート SPA。  
> メモを書きながら翻訳・要約・文法チェックなどの AI 機能をその場で呼び出せます。

---

## 🔗 リンク

| | |
|---|---|
| 🌐 **Live Demo** | [https://note-with-claude-ai.vercel.app](https://note-with-cluade-ai.vercel.app/) |
| 💻 **GitHub** | [https://github.com/game880818/note-with-ClaudeAI](https://github.com/game880818/note-with-ClaudeAI) |

---

## 📸 スクリーンショット

### メイン画面
![メイン画面](https://github.com/user-attachments/assets/fda552c7-4bed-4379-8121-72e542d37eca)

### AI パネル
![AIパネル](https://github.com/user-attachments/assets/1c71b46e-6212-42c3-8de5-084d2c98b290)

### タグ絞り込み
![タグ絞り込み](https://github.com/user-attachments/assets/c6a24e8e-988f-4db8-8f29-9f7c997ee6c9)

### デモ GIF
![デモgif](https://github.com/user-attachments/assets/93c1c023-6dc0-41c9-8f1b-7ad7d1516cba)

---

## ✨ 主な機能

- 📄 **ノート管理** — 作成・編集・削除・テキスト検索（タイトル・本文）
- 🏷️ **タグシステム** — カラー付きタグの追加・タグによる絞り込み
- 🤖 **AI パネル**（Claude API 搭載）
  - 🇯🇵 日本語翻訳
  - 🇺🇸 英語翻訳
  - 📋 ノート内容の要約
  - ✏️ 文法チェック
- 🕓 **AI 実行履歴** — 直近 5 件の結果をパネルに表示
- 🔐 **Google 認証（Supabase Auth）** — Google アカウントでログイン／ログアウト、ユーザーごとにノートを分離管理
- ☁️ **クラウド同期・永続化（Supabase / PostgreSQL）** — ノートはデータベースに保存され、複数端末間でリアルタイムに同期
- 💾 **自動保存（デバウンス方式）** — 入力後 1 秒間操作がなければ自動的に Supabase へ保存、無駄な API 呼び出しを削減
- 🛡️ **セキュアな AI 連携（Supabase Edge Functions）** — Anthropic API キーをフロントエンドから排除し、サーバーサイド（Edge Function）経由で安全に呼び出し

---

## 🛠️ 使用技術

| カテゴリ | 技術 |
|---|---|
| フロントエンド | React 18 / TypeScript / Vite |
| UI ライブラリ | react-markdown |
| 認証・DB・BaaS | Supabase（Auth / PostgreSQL / Edge Functions） |
| サーバーレス関数 | Supabase Edge Functions（Deno ランタイム） |
| HTTP クライアント | Axios |
| AI | Anthropic Claude API（`claude-sonnet-4-6`、Edge Function 経由で呼び出し）|
| データ永続化 | Supabase（PostgreSQL） |
| デプロイ | Vercel（フロントエンド）／ Supabase（バックエンド） |

---

## 🏗️ ディレクトリ構成

```
├── lib/
│   └── supabase.ts      # Supabase クライアント初期化
├── supabase/
│   ├── config.toml       # Supabase プロジェクト設定
│   └── functions/
│       └── ai-action/
│           └── index.ts  # AI 呼び出し用 Edge Function（APIキーをサーバー側で保持）
└── src/
    ├── Components/
    │   ├── Sidebar.tsx    # ノート一覧・検索・タグフィルター
    │   ├── Topbar.tsx     # タイトル入力・タグ管理・Google ログイン／ログアウト
    │   ├── Editor.tsx     # ノート本文エディター
    │   └── AiPanel.tsx    # AI 機能パネル・実行履歴
    ├── utils/
    │   ├── ai.ts          # supabase.functions.invoke() 経由での AI 呼び出し処理
    │   └── formalTime.tsx # 日時フォーマット処理
    ├── Types/
    │   └── index.ts       # Note / Tag / AiResult 型定義
    └── App.tsx             # ルート状態管理・認証状態管理・DB CRUD 処理
```

---

## 💡 技術的な工夫

- **`useCallback` によるメモ化** — Editor コンポーネントへの不要な再レンダリングを防止
- **AI 通信のローディング制御・エラーハンドリング** — リクエスト中はボタンを無効化し、アニメーションインジケーターとエラーメッセージを表示
- **責務ごとのコンポーネント分割** — 各コンポーネントが単一の責務を持ち、App を状態の唯一の源（Single Source of Truth）とした設計
- **TypeScript による厳密な型管理** — `Note` / `Tag` / `AiResult` の独自型を定義し、API レスポンスから UI まで一貫した型安全性を確保
- **AI 結果履歴の上限管理** — 新しい結果を先頭に追加し `.slice(0, 5)` で最新 5 件に制限
- **タグカラーの自動循環** — モジュロ演算（`COLOR_CYCLE[tags.length % COLOR_CYCLE.length]`）で色を自動割り当て
- **Google OAuth 認証フロー** — `supabase.auth.signInWithOAuth` と `onAuthStateChange` を用いてログイン状態をリアルタイムに監視し、セッションを `App` の state として一元管理
- **認証状態とデータ取得の同期（競合状態の解消）** — ノート取得用 `useEffect` の依存配列に `session` を追加し、Supabase のセッション初期化が完了する前にノート取得が走ってしまう競合状態（race condition）を解消
- **デバウンスによる自動保存** — `setTimeout` と `clearTimeout` を組み合わせ、入力が 1 秒間止まったタイミングでのみ Supabase へ `update` を実行し、DB 書き込み回数を抑制
- **API キーの完全サーバーサイド化** — Anthropic API キーをフロントエンドの環境変数から排除し、Supabase Edge Function（Deno）内の環境変数として保持することで、キーの漏洩リスクを解消

---

## 🚀 ローカル環境での実行手順

### 事前準備

- Node.js v18 以上
- [Supabase アカウント](https://supabase.com/) ＆ プロジェクト作成
- Supabase 上で Google OAuth プロバイダーの設定（Google Cloud Console でのクライアントID発行を含む）
- [Anthropic API キー](https://console.anthropic.com/)（Edge Function の環境変数として設定）

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/game880818/note-with-ClaudeAI.git
cd note-with-ClaudeAI

# 依存パッケージをインストール
npm install

# フロントエンド用環境変数を設定
cat <<EOF > .env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
EOF

# Edge Function 側の環境変数（Anthropic API キー）は
# Supabase ダッシュボード、または Supabase CLI で設定
# 例：supabase secrets set ANTHROPIC_API_KEY=your_api_key_here

# Edge Function をデプロイ（初回のみ）
supabase functions deploy ai-action

# 開発サーバーを起動
npm run dev
```

---

## 🔮 今後の改善予定

- [ ] レスポンシブ対応
- [✅] バックエンド・DB 連携による複数端末同期
- [✅] ユーザー認証（マルチユーザー対応）
- [✅] API キーのバックエンド移行（セキュリティ強化）
- [ ] AI レスポンスのストリーミング表示
- [ ] ノートの Markdown / PDF エクスポート
- [ ] AI による自動タグ提案

---
