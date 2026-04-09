module.exports = function handler(req, res) {
  const hasKey = !!process.env.OPENAI_API_KEY;
  res.status(200).json({ 
    status: 'ok', 
    message: 'API funcionando',
    hasOpenAIKey: hasKey,
    keyPrefix: hasKey ? process.env.OPENAI_API_KEY.substring(0, 10) + '...' : 'NAO CONFIGURADA'
  });
};
