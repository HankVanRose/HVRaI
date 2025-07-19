export interface Message {
  id: string;
  content: string;
  role: AppRole;
  time: string;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
}

export interface DeepSeekMessage {
  role: DeepSeekRole;  
  content: string;
}
export type DeepSeekRole = 'system' | 'user' | 'assistant';

export type AppRole = DeepSeekRole | 'tool';
