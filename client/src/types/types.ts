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

export interface IUser {
  id: number;
  userName: string;
  email: string;
  password: string;
  avatar: string;
}

export type AppRole = 'user' | 'assistant' | 'system' | 'tool';
export type DBRole = 'user' | 'assistant' | 'system'; // Роли, поддерживаемые базой данных

export interface DBMessage {
  id: string;
  content: string;
  role: DBRole;
  time: string;
}

export interface DBChat {
  id: string;
  title: string;
  messages: DBMessage[];
  createdAt: string;
}

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
