import axios from 'axios';
import { chatStore } from '../stores/ChatStore';

interface YandexGPTMessage {
  role: 'user' | 'assistant';
  text: string;
}

interface YandexGPTRequest {
  modelUri: string;
  completionOptions: {
    stream: boolean;
    temperature: number;
    maxTokens: string;
    reasoningOptions: {
      mode: 'DISABLED' | 'ENABLED';
    };
  };
  messages: YandexGPTMessage[];
}

interface YandexGPTResponse {
  result?: {
    alternatives?: Array<{
      message?: {
        text?: string;
      };
    }>;
  };
}

export const fetchYandexGPTResponse = async (
  messages: YandexGPTMessage[]
): Promise<string> => {
  try {
    const requestData: YandexGPTRequest = {
      modelUri: 'gpt://b1gsv64ggetlkt9cfnr3/yandexgpt',
      completionOptions: {
        stream: false,
        temperature: 0.6,
        maxTokens: '2000',
        reasoningOptions: {
          mode: 'DISABLED',
        },
      },
      messages,
    };

    const response = await axios.post<YandexGPTResponse>(
      `${import.meta.env.VITE_API_URL}/yandex/api/yandex-gpt`,
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.data) {
      throw new Error('YandexGPT API вернул пустой ответ');
    }

    return response.data.result?.alternatives?.[0]?.message?.text || 'Пустой ответ';
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

  // Преобразуем сообщения в формат YandexGPT (последние 10 сообщений)
  const apiMessages = currentChat.messages
    .filter((msg) => ['user', 'assistant'].includes(msg.role))
    .slice(-10) // Ограничиваем историю сообщений
    .map((msg) => ({
      role: msg.role as 'user' | 'assistant',
      text: msg.content,
    }));

  // Получаем ответ от YandexGPT
  const aiResponse = await fetchYandexGPTResponse(apiMessages);

  // Добавляем ответ AI в чат
  await chatStore.addMessage(chatStore.currentChatId, {
    content: aiResponse,
    role: 'assistant',
  });
};