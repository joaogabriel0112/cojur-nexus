// Vercel Serverless Function — proxy seguro para OpenAI GPT-5.4

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OPENAI_API_KEY nao configurada no servidor' });
  }

  try {
    const { messages, max_tokens, system } = req.body;

    const body = {
      model: 'gpt-5.4',
      max_tokens: max_tokens || 1000,
      messages: system
        ? [{ role: 'system', content: system }, ...messages]
        : messages,
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'Erro na API OpenAI' });
    }

    // Retorna no formato compativel com o app
    const text = data.choices?.[0]?.message?.content || '';
    return res.status(200).json({
      content: [{ type: 'text', text }]
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
