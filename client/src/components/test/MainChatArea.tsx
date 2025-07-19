import { Box, IconButton, TextField, Typography, Avatar, Paper, styled } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { chatStore } from '../../stores/ChatStore';

const MessageBubble = styled(Paper)(({ theme }) => ({
  maxWidth: '70%',
  padding: '12px 16px',
  marginBottom: '12px',
  borderRadius: '18px',
  alignSelf: 'flex-start',
  backgroundColor: theme.palette.grey[100],
}));

const UserMessageBubble = styled(MessageBubble)(({ theme }) => ({
  alignSelf: 'flex-end',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

export const MainChatArea = observer(() => {
  const [message, setMessage] = useState('');

  return (
    <Box sx={{ 
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      marginLeft: '68px', // Отступ равный ширине закрытой панели
      transition: 'margin-left 0.3s ease',
    }}>
      {/* Область сообщений */}
      <Box sx={{ 
        flex: 1,
        overflowY: 'auto',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
      }}>
        {chatStore.currentChat?.messages.length === 0 && (
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            textAlign: 'center',
          }}>
            <Avatar sx={{ width: 80, height: 80, mb: 2 }}>
              AI
            </Avatar>
            <Typography variant="h5" gutterBottom>
              Как я могу вам помочь сегодня?
            </Typography>
            <Typography color="text.secondary">
              Задайте мне любой вопрос или начните новый чат
            </Typography>
          </Box>
        )}

        {chatStore.currentChat?.messages.map((msg) => (
          msg.role === 'user' ? (
            <UserMessageBubble key={msg.id}>
              <Typography>{msg.content}</Typography>
            </UserMessageBubble>
          ) : (
            <MessageBubble key={msg.id}>
              <Typography>{msg.content}</Typography>
            </MessageBubble>
          )
        ))}
      </Box>

      {/* Поле ввода */}
      <Box sx={{ 
        p: 2,
        borderTop: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            fullWidth
            placeholder="Введите сообщение..."
            variant="outlined"
            size="medium"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ 
              mr: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: '24px',
              },
            }}
          />
          <IconButton 
            color="primary" 
            disabled={!message.trim()}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
});