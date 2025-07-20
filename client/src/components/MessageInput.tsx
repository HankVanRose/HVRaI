import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, TextField, IconButton, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { chatStore } from '../stores/ChatStore';
import { sendMessageWithAIResponse } from '../utils/api';

export const MessageInput = observer(() => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !chatStore.currentChatId || isLoading) return;

    setIsLoading(true);
    try {
      await sendMessageWithAIResponse(message);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Введите сообщение..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        sx={{ minWidth: 500, maxWidth: 700 }}
        disabled={isLoading}
      />
      <IconButton
        type="submit"
        color="primary"
        disabled={!message.trim() || isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : <SendIcon />}
      </IconButton>
    </Box>
  );
});
