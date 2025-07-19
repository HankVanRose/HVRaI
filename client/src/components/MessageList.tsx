import React from 'react';
import { observer } from 'mobx-react-lite';
import {
  List,
  ListItem,
  ListItemText,
  Avatar,
  Box,
  Typography,
} from '@mui/material';
import { chatStore } from '../stores/ChatStore';

export const MessageList = observer(() => {
  const currentChat = chatStore.currentChat;

  if (!currentChat) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Выберите чат или создайте новый
        </Typography>
      </Box>
    );
  }

  return (
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        overflow: 'auto',
        flexGrow: 1,
      }}
    >
      {currentChat.messages.map((message) => (
        <ListItem key={message.id} alignItems="flex-start">
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              flexDirection: message.role === 'user' ? 'row-reverse' : 'row',
            }}
          >
            <Avatar
              sx={{
                ml: message.role === 'user' ? 2 : 0,
                mr: message.role === 'user' ? 0 : 2,
              }}
            >
              {message.role === 'user' ? 'U' : 'AI'}
            </Avatar>
            <Box
              sx={{
                maxWidth: '70%',
                p: 2,
                borderRadius: 2,
                bgcolor: message.role === 'user' ? 'primary.light' : 'grey.100',
                color:
                  message.role === 'user'
                    ? 'primary.contrastText'
                    : 'text.primary',
              }}
            >
              <ListItemText
                primary={message.content}
                secondary={new Date(message.time).toLocaleTimeString()}
                sx={{ wordBreak: 'break-word' }}
              />
            </Box>
          </Box>
        </ListItem>
      ))}
    </List>
  );
});
