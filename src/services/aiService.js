const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

/**
 * Send a message to the AI and get a finance-focused response.
 * @param {Array<{role: string, content: string}>} messages - conversation history
 * @param {Object} userProfile - user's financial profile for context
 * @returns {Promise<string>} AI response text
 */
export async function sendToAI(messages, userProfile) {
  const payload = {
    messages: messages.map(m => ({ role: m.role, content: m.content })),
  }

  const res = await fetch(`${API_BASE_URL}/api/ai/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Add auth token if you have one stored
      // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`AI API error ${res.status}: ${err}`)
  }

  const data = await res.json()
  return data.reply ?? 'Sorry, I could not generate a response. Please try again.'
}
