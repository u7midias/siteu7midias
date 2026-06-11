// api/chat.js — Função serverless (Vercel) que conecta o agente do site à API da Anthropic.
// A chave fica segura no servidor, nunca exposta no navegador.

export default async function handler(req, res) {
  // Aceita apenas POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY não configurada no Vercel' });
  }

  try {
    const { model, max_tokens, system, messages } = req.body;

    const resposta = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: model || 'claude-sonnet-4-20250514',
        max_tokens: max_tokens || 1000,
        system,
        messages
      })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      console.error('Erro da API Anthropic:', dados);
      return res.status(resposta.status).json(dados);
    }

    return res.status(200).json(dados);
  } catch (erro) {
    console.error('Erro no servidor:', erro);
    return res.status(500).json({ error: 'Erro interno ao processar a mensagem' });
  }
}
