import {   ListItem, ListItemButton, ListItemText, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import { FaRocketchat } from 'react-icons/fa';
import { observer } from 'mobx-react-lite';
import {   chatStore } from '../../stores/ChatStore';
 
import { useState } from 'react';
import { TextField } from '@mui/material';
import type { Chat } from '../../types/types';
import { ChatEditControls } from './ChatEditControls';

interface ChatListItemProps {
  chat: Chat;
  open: boolean;
}

export const ChatListItem = observer(({ chat, open }: ChatListItemProps) => {
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');

  const handleStartEdit = (currentTitle: string) => {
    setEditingChatId(chat.id);
    setNewTitle(currentTitle);
  };

  const handleSaveEdit = async () => {
    await chatStore.updateChatTitle(chat.id, newTitle);
    setEditingChatId(null);
  };

  const handleCancelEdit = () => {
    setEditingChatId(null);
  };

  if (!open) {
    return (
      <Tooltip
        title={chat.title.length > 16 ? `${chat.title.slice(0, 16)}...` : chat.title}
        placement="right"
      >
        <ListItem sx={{ justifyContent: 'center' }}>
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -50, height: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ListItemButton
              selected={chat.id === chatStore.currentChatId}
              onClick={() => chatStore.setCurrentChat(chat.id)}
              sx={{
                justifyContent: 'center',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <FaRocketchat style={{ width: 20 }} />
            </ListItemButton>
          </motion.div>
        </ListItem>
      </Tooltip>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50, height: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ListItem
        sx={{ width: 270 }}
        secondaryAction={
          <ChatEditControls
            chatId={chat.id}
            editingChatId={editingChatId}
            onStartEdit={() => handleStartEdit(chat.title)}
            onSaveEdit={handleSaveEdit}
            onCancelEdit={handleCancelEdit}
          />
        }
        disablePadding
      >
        <ListItemButton
        
          selected={chat.id === chatStore.currentChatId}
          onClick={() => chatStore.setCurrentChat(chat.id)}
        >
          {editingChatId === chat.id ? (
            <TextField
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              sx={{maxWidth:190}}
              fullWidth
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveEdit();
                if (e.key === 'Escape') handleCancelEdit();
              }}
            />
          ) : (
            <ListItemText
              primary={chat.title.length > 16 ? `${chat.title.slice(0, 16)}...` : chat.title}
              secondary={new Date(chat.createdAt).toLocaleString()}
            />
          )}
        </ListItemButton>
      </ListItem>
    </motion.div>
  );
});