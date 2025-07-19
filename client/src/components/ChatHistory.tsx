import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  styled,
  IconButton,
  TextField,
  Box,
  Button,
  Drawer,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { chatStore } from '../stores/ChatStore';
import { useState } from 'react';
import { ArrowBack, Check, Close, Delete, Edit, Menu } from '@mui/icons-material';
import { observer } from 'mobx-react-lite';

const StyledListItem = styled(ListItem)({
  padding: '8px 8px',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
});

export const ChatHistory = observer(() => {
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

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
    <>
      {/* Кнопка для открытия меню */}
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer(true)}
        edge="start"
        sx={{ mr: 2, position: 'fixed', left: 10, top: 10 }}
      >
        <Menu />
      </IconButton>

      {/* Сама боковая панель */}
        
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 300,
            boxSizing: 'border-box',
          },
        }}
      >
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
            <Button onClick={() => {
              chatStore.createChat();
              toggleDrawer(false)();
            }} color="primary">
              Новый чат
            </Button>
          </Box>
          <Typography variant="h6" sx={{ p: 2, fontWeight: 'bold' }}>
            История чатов
          </Typography>
          <List>
            {chatStore.chats.map((chat) => (
              <StyledListItem
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
                  onClick={() => {
                    chatStore.setCurrentChat(chat.id);
                    toggleDrawer(false)();
                  }}
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
              </StyledListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
});