const PROMPT: Record<string, (text: string) => string> = {
  'translate-jp': (text) => `日本語に翻訳してください：${text}`,
  'translate-en': (text) => `英語に翻訳してください：${text}`,
  'summerize': (text) => `要約してください：${text}`,
  'grammer': (text) => `文法をチェックしてください：${text}`,
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    })
  }

  try {
    const { action, text } = await req.json()

    if (!text?.trim()) {
      return new Response(
        JSON.stringify({ error: 'ノートに内容を入力してください' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
    }

    const apiKey = Deno.env.get('ANTHROPIC_API_KEY')

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'X-Api-Key': apiKey!,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        messages: [{ role: 'user', content: PROMPT[action](text) }],
      }),
    })

    const data = await response.json()
    const resultText = data.content?.[0]?.text ?? ''

    return new Response(
      JSON.stringify({ text: resultText }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: String(error) }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  }
})