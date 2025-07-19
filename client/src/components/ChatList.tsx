import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  TextField,
  Box,
  Divider,
  Typography,
} from '@mui/material';
import { Add, Delete, Edit, Check, Close } from '@mui/icons-material';
import { chatStore } from '../stores/ChatStore';
import { db } from '../hooks/useIndexDb';

export const ChatList = observer(() => {
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');

  const handleStartEdit = (chatId: string, currentTitle: string) => {
    setEditingChatId(chatId);
    setNewTitle(currentTitle);
  };

  const handleSaveEdit = async (chatId: string) => {
    await chatStore.updateChatTitle(chatId, newTitle);
    setEditingChatId(null);
  };

  const handleCancelEdit = () => {
    setEditingChatId(null);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography component={'h3'}>HVRCHat</Typography>
        <IconButton onClick={() => chatStore.createChat()} color="primary">
          <Add />
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ flexGrow: 1, overflow: 'auto' }}>
        {chatStore.chats.map((chat) => (
          <ListItem
            key={chat.id}
            secondaryAction={
              editingChatId === chat.id ? (
                <>
                  <IconButton
                    edge="end"
                    onClick={() => handleSaveEdit(chat.id)}
                  >
                    <Check />
                  </IconButton>
                  <IconButton edge="end" onClick={handleCancelEdit}>
                    <Close />
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton
                    edge="end"
                    onClick={() => handleStartEdit(chat.id, chat.title)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    edge="end"
                    onClick={() => chatStore.deleteChat(chat.id)}
                  >
                    <Delete />
                  </IconButton>
                </>
              )
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
                  size="small"
                  fullWidth
                  autoFocus
                />
              ) : (
                <ListItemText
                  primary={chat.title}
                  secondary={new Date(chat.createdAt).toLocaleString()}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
});
