import { makeAutoObservable, runInAction } from 'mobx';
import type { Chat, Message } from '../types/types';
import { db } from '../hooks/useIndexDb';
import { v4 as uuidv4 } from 'uuid';

class ChatStore {
  chats: Chat[] = [];
  currentChatId: string | null = null;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  async init() {
    this.isLoading = true;
    try {
      const chats = await db.chats.toArray();
      runInAction(() => {
        this.chats = chats;
        if (chats.length > 0 && !this.currentChatId) {
          this.currentChatId = chats[0].id;
        }
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  get currentChat(): Chat | undefined {
    return this.chats.find((chat) => chat.id === this.currentChatId);
  }

  async createChat() {
    const newChat: Chat = {
      id: uuidv4(),
      title: 'Новый Чат',
      messages: [],
      createdAt: new Date().toISOString(),
    };

    await db.chats.add(newChat);
    runInAction(() => {
      this.chats.unshift(newChat);
      this.currentChatId = newChat.id;
    });
  }

  async updateChatTitle(chatId: string, newTitle: string) {
    await db.chats.update(chatId, { title: newTitle });
    runInAction(() => {
      const chat = this.chats.find((ch) => ch.id === chatId);
      if (chat) chat.title = newTitle;
    });
  }

  async addMessage(chatId: string, message: Omit<Message, 'id' | 'time'>) {
    const newMessage: Message = {
      ...message,
      id: uuidv4(),
      time: new Date().toISOString(),
    };

    const chat = await db.chats.get(chatId);
    if (!chat) throw new Error('Чат не найден');

    const updatedChat = {
      ...chat,
      messages: [...chat.messages, newMessage],
    };

    if (updatedChat.messages.length === 1) {
      updatedChat.title = message.content.slice(0, 30);
    }

    await db.chats.put(updatedChat);

    runInAction(() => {
      const index = this.chats.findIndex((c) => c.id === chatId);
      if (index !== -1) {
        this.chats[index] = updatedChat;
      }
    });

    return newMessage;
  }

  async deleteChat(chatId: string) {
    await db.chats.delete(chatId);
    runInAction(() => {
      this.chats = this.chats.filter((chat) => chat.id !== chatId);
      if (this.currentChatId === chatId) {
        this.currentChatId = this.chats[0]?.id || null;
      }
    });
  }

  setCurrentChat(chatId: string) {
    this.currentChatId = chatId;
  }
}

export const chatStore = new ChatStore();
