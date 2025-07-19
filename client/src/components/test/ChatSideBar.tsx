import {
  Drawer,
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  ChevronLeft,
  Add,
  ChatBubbleOutline,
  Menu,
  ArrowBack,
  Check,
  Close,
  Edit,
  Delete,
} from '@mui/icons-material';
import { observer } from 'mobx-react-lite';
import { chatStore } from '../../stores/ChatStore';
import { BiWindowOpen } from 'react-icons/bi';
import { useState } from 'react';

export const ChatSidebar = observer(
  ({ open, onToggle }: { open: boolean; onToggle: () => void }) => {
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
      <>
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            width: open ? 260 : 68,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            transition: 'width 0.3s ease',
            '& .MuiDrawer-paper': {
              width: open ? 260 : 68,
              overflowX: 'hidden',
              transition: 'width 0.3s ease',
              boxSizing: 'border-box',
              borderRight: 'none',
            },
          }}
          open={open}
        >
          <Box
            sx={{
              p: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              minHeight: 64,
            }}
          >
            {open ? (
              <>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => chatStore.createChat()}
                  fullWidth
                  sx={{ mr: 1 }}
                >
                  Новый чат
                </Button>
                <IconButton onClick={onToggle}>
                  <BiWindowOpen style={{ rotate: '270deg' }} />
                </IconButton>
              </>
            ) : (
              <Tooltip title="Новый чат" placement="right">
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <IconButton
                    onClick={() => chatStore.createChat()}
                    sx={{ width: 44, height: 44 }}
                  >
                    <Add />
                  </IconButton>
                  <IconButton onClick={onToggle} sx={{ width: 44, height: 44 }}>
                    <BiWindowOpen style={{ rotate: '90deg' }} />
                  </IconButton>
                </Box>
              </Tooltip>
            )}
          </Box>

          <List>
            {chatStore.chats.map((chat) =>
              open ? (
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
                    <ListItemText
                      primary={chat.title}
                      secondary={new Date(chat.createdAt).toLocaleString()}
                    />
                  </ListItemButton>
                </ListItem>
              ) : (
                <Tooltip key={chat.id} title={chat.title} placement="right">
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={chat.id === chatStore.currentChatId}
                      onClick={() => chatStore.setCurrentChat(chat.id)}
                      sx={{ justifyContent: 'center' }}
                    >
                      <ListItemIcon sx={{ minWidth: 'auto' }}>
                        <ChatBubbleOutline />
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                </Tooltip>
              )
            )}
          </List>
        </Drawer>
      </>
    );
  }
);
