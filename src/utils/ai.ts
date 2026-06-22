import supabase from '../../lib/supabase'
// AI が実行できるアクションの種類
export type AiActionType = 'translate-jp' | 'translate-en' | 'summerize' | 'grammer'

// 各アクションのプロンプト
// const PROMPT: Record<AiActionType, (text: string) => string> = {
//   'translate-jp': (text) => `日本語に翻訳してください：${text}`,
//   'translate-en': (text) => `英語に翻訳してください：${text}`,
//   'summerize': (text) => `要約してください：${text}`,
//   'grammer': (text) => `文法をチェックしてください：${text}`,
// }

// Claude API を呼び出す関数
export async function getAiResponse(action: AiActionType, text: string): Promise<string> {
  if (!text.trim()) throw new Error('ノートに内容を入力してください')
  
  //  Supabase 関数を呼び出す
  const { data, error } = await supabase.functions.invoke('ai-action', {
    body: { action, text },
  })
  console.log(data, error)

  if (error) throw new Error(error.message)
  return data.text ?? ''
}


// UI で使うメタ情報
export const AI_ACTION_META: Record<
  AiActionType,
  { icon: string, label: string, badge: string, dotColor: string }
> = {
  'translate-jp': { icon: '🇯🇵', label: '日本語に翻訳', badge: '→JA', dotColor: '#F2A7B0' },
  'translate-en': { icon: '🌍', label: '英語に翻訳', badge: '→EN', dotColor: '#97BEF0' },
  'summerize': { icon: '📋', label: 'ノートを要約', badge: 'AI', dotColor: '#8FD0BA' },
  'grammer': { icon: '✏️', label: '文法チェック', badge: 'JA', dotColor: '#F5D97A' },
}