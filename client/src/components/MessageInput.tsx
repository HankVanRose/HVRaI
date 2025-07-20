import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, TextField, CircularProgress, Typography } from '@mui/material';
import { ImArrowUpLeft2 } from 'react-icons/im';

import { chatStore } from '../stores/ChatStore';
import { sendMessageWithAIResponse } from '../utils/api';
import { SendButton } from './atom/SendButton';

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
        position: 'relative',
        width: '100%',
        maxWidth: 700,
        margin: '0 auto',
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Задай HVR любой вопрос..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        sx={{
          width: '100%',
          '& .MuiOutlinedInput-root': {
            borderRadius: '22px',
            paddingRight: '220px',
          },
        }}
        disabled={isLoading}
      />
      <SendButton
        type="submit"
        color="primary"
        disabled={!message.trim() || isLoading}
        sx={{
          position: 'absolute',
          right: 22,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1,
        }}
      >
        {isLoading ? (
          <CircularProgress size={34} />
        ) : (
          <>
            <Typography
              sx={{ display: { xs: 'none', sm: 'block' }, fontSize: 15 }}
            >
              Отправить
            </Typography>
            <ImArrowUpLeft2 style={{ rotate: '90deg', marginLeft: 3 }} />
          </>
        )}
      </SendButton>
    </Box>
  );
});
