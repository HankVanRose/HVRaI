import Dexie from 'Dexie';

export interface DBChat {
  id: string;
  title: string;
  messages: {
    id: string;
    content: string;
    role: `system` | `user` | `assistant`;
    time: string;
  }[];
  createdAt: string;
}

class ChatDatabase extends Dexie {
  chats: Dexie.Table<DBChat, string>;

  constructor() {
    super('ChatDataBase');

    this.version(2)
      .stores({
        chats: 'id, title, createdAt',
      })
      .upgrade((trans) => {
        return trans
          .table('chats')
          .toCollection()
          .modify((chat) => {
            chat.messages = chat.messages.map((msg) => ({
              ...msg,
              role: ['system', 'user', 'assistant', 'tool'].includes(msg.role)
                ? msg.role
                : 'assistant',
            }));
          });
      });

    this.chats = this.table('chats');
  }
}

export const db = new ChatDatabase();
