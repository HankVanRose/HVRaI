import { chatStore } from '../stores/ChatStore';
import type { DeepSeekRole, MessageRole } from '../types/types';

interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export const fetchAIResponse = async (
  messages: DeepSeekMessage[]
): Promise<string> => {
  const YANDEX_API_KEY = import.meta.env.VITE_YANDEX_OAUTH_KEY;

  if (!YANDEX_API_KEY) {
    console.error('DeepSeek API Key is missing!');
    return '❌ Ошибка: API-ключ не указан';
  }

  try {
    const response = await fetch('https://llm.api.cloud.yandex.net/llm/v1alpha/chat', {
    method: 'POST',
    headers: {
      'Authorization': `Api-Key ${import.meta.env.VITE_YANDEX_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'general',
      messages: messages.map(msg => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        text: msg.content
      }))
    })
  });
  const data = await response.json();
  return data.result?.alternatives[0]?.message?.text || 'Ошибка';
  } catch (error) {
    console.error('DeepSeek Request Failed:', error);
    return `⚠️ Ошибка: ${
      error instanceof Error ? error.message : String(error)
    }`;
  }
};

export const sendMessageWithAIResponse = async (
  userMessage: string
): Promise<void> => {
  if (!chatStore.currentChatId) {
    console.error('No chat selected');
    return;
  }

  // Добавляем сообщение пользователя
  await chatStore.addMessage(chatStore.currentChatId, {
    content: userMessage,
    role: 'user',
  });

  const currentChat = chatStore.currentChat;
  if (!currentChat) return;

  // Преобразуем сообщения в формат DeepSeek
  const apiMessages: DeepSeekMessage[] = currentChat.messages
    .filter(
      (msg) => ['system', 'user', 'assistant'].includes(msg.role) // Фильтруем только допустимые роли
    )
    .map((msg) => ({
      role: msg.role as DeepSeekRole, // Приводим тип, так как мы уже отфильтровали
      content: msg.content,
    }));

  // Получаем ответ от AI
  const aiResponse = await fetchAIResponse(apiMessages);

  // Добавляем ответ AI в чат
  await chatStore.addMessage(chatStore.currentChatId, {
    content: aiResponse,
    role: 'assistant',
  });
};
