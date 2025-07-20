import { chatStore } from '../stores/ChatStore';
import type { DeepSeekRole, Message } from '../types/types';

interface YandexGPTMessage {
  role: 'user' | 'assistant'; // YandexGPT использует только эти роли
  text: string;
}

export const fetchYandexGPTResponse = async (messages: YandexGPTMessage[]): Promise<string> => {
  try {
    const response = await fetch('http://localhost:3001/api/yandex-gpt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'general',
        messages: messages
      })
    });

    if (!response.ok) {
      throw new Error(`YandexGPT API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.result?.alternatives[0]?.message?.text || 'Пустой ответ';
  } catch (error) {
    console.error('YandexGPT Error:', error);
    return 'Ошибка соединения с YandexGPT';
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

  // Преобразуем сообщения в формат YandexGPT
  const apiMessages: YandexGPTMessage[] = currentChat.messages
    .filter(msg => ['user', 'assistant'].includes(msg.role))
    .map(msg => ({
      role: msg.role as 'user' | 'assistant',
      text: msg.content
    }));

  // Получаем ответ от YandexGPT
  const aiResponse = await fetchYandexGPTResponse(apiMessages);

  // Добавляем ответ AI в чат
  await chatStore.addMessage(chatStore.currentChatId, {
    content: aiResponse,
    role: 'assistant',
  });
};