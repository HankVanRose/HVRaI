import {
  Box,
  IconButton,
  TextField,
  Typography,
  Avatar,
  Paper,
  styled,
  ListItemText,
  ListItem,
  Button,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { chatStore } from '../../stores/ChatStore';
import { MessageInput } from '../MessageInput';
import { Add } from '@mui/icons-material';
import './MainChatArea.css';

// const MessageBubble = styled(Paper)(({ theme }) => ({
//   maxWidth: '70%',
//   padding: '12px 16px',
//   marginBottom: '12px',
//   borderRadius: '18px',
//   alignSelf: 'flex-start',
//   backgroundColor: theme.palette.grey[100],
// }));

// const UserMessageBubble = styled(MessageBubble)(({ theme }) => ({
//   alignSelf: 'flex-end',
//   backgroundColor: theme.palette.primary.main,
//   color: theme.palette.primary.contrastText,
// }));

export const MainChatArea = observer(() => {
  const [message, setMessage] = useState('');
  const currentChat = chatStore?.currentChat;
  const bottomRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages]); // Добавляем messages в зависимости

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',

        transition: 'margin-left 0.5s ease',
      }}
    >
      {/* Область сообщений */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 5,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {chatStore.currentChat?.messages.length === 0 && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center',
            }}
          >
            <Avatar sx={{ width: 80, height: 80, mb: 2, background:'none' }}>
              {' '}
              <div className="orbit-spinner">
                <div className="orbit"></div>
                <div className="orbit"></div>
                <div className="orbit"></div>
              </div>
            </Avatar>
            <Typography variant="h5" gutterBottom>
              Как я могу вам помочь сегодня?
            </Typography>
            <Typography color="text.secondary">
              Задайте мне любой вопрос или начните новый чат
            </Typography>
          </Box>
        )}

        {currentChat?.messages.map((message) => (
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
                  borderRadius: 4,
                  bgcolor: message.role === 'user' ? '#b76052' : '#bfb09e',
                  color: message.role === 'user' ? 'white' : 'text.secondary',
                }}
              >
                <ListItemText
                  primary={message.content}
                  sx={{ wordBreak: 'break-word' }}
                />
              </Box>
            </Box>
          </ListItem>
        ))}
        <div ref={messagesEndRef} />
      </Box>
      <Box
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 64,
        }}
      >
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => chatStore.createChat()}
          sx={{ mr: 1 }}
        >
          Новый чат
        </Button>
      </Box>
      <MessageInput />
    </Box>
  );
});
