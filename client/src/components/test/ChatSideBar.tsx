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
 
  TextField,
  Typography,
  Avatar,
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { FaRocketchat } from 'react-icons/fa';
import { RiChatNewLine } from 'react-icons/ri';
import {
   
  Add,
 
 
  
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
    const [deletingChatId, setDeletingChatId] = useState<string | null>(null);

    const handleDeleteWithAnimation = async (chatId: string) => {
      setDeletingChatId(chatId);
      await new Promise((resolve) => setTimeout(resolve, 100));
      await chatStore.deleteChat(chatId);
      setDeletingChatId(null);
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
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            width: open ? 280 : 68,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            transition: 'width 0.5s ease',
            '& .MuiDrawer-paper': {
              width: open ? 280 : 68,
              overflowX: 'hidden',
              transition: 'width 0.5s ease',
              boxSizing: 'border-box',
              borderRight: 'none',
              background:
                'radial-gradient(at 73.06952744888413% 92.4338118336492%, hsla(0, 0%, 96.86274509803921%, 1) 0%, hsla(0, 0%, 96.86274509803921%, 0) 100%), radial-gradient(at 28.188531551861253% 79.69220278701363%, hsla(312.3529411764706, 28.81355932203392%, 76.86274509803921%, 1) 0%, hsla(312.3529411764706, 28.81355932203392%, 76.86274509803921%, 0) 100%), radial-gradient(at 55.04660756199649% 46.02952049127747%, hsla(7.826086956521784, 23.71134020618557%, 80.98039215686275%, 1) 0%, hsla(7.826086956521784, 23.71134020618557%, 80.98039215686275%, 0) 100%), radial-gradient(at 42.04973604981159% 50.922926129470845%, hsla(30.697674418604645, 44.3298969072165%, 80.98039215686275%, 1) 0%, hsla(30.697674418604645, 44.3298969072165%, 80.98039215686275%, 0) 100%), radial-gradient(at 96.31659219230477% 70.63847124782411%, hsla(68.10810810810808, 45.67901234567898%, 84.11764705882354%, 1) 0%, hsla(68.10810810810808, 45.67901234567898%, 84.11764705882354%, 0) 100%), radial-gradient(at 26.090280492781638% 80.06652599005697%, hsla(0, 0%, 96.86274509803921%, 1) 0%, hsla(0, 0%, 96.86274509803921%, 0) 100%), radial-gradient(at 81.1511744734639% 81.42997996403929%, hsla(312.3529411764706, 28.81355932203392%, 76.86274509803921%, 1) 0%, hsla(312.3529411764706, 28.81355932203392%, 76.86274509803921%, 0) 100%), radial-gradient(at 18.046953235503025% 5.928477776775143%, hsla(7.826086956521784, 23.71134020618557%, 80.98039215686275%, 1) 0%, hsla(7.826086956521784, 23.71134020618557%, 80.98039215686275%, 0) 100%), radial-gradient(at 23.878960976084084% 21.560769210759844%, hsla(30.697674418604645, 44.3298969072165%, 80.98039215686275%, 1) 0%, hsla(30.697674418604645, 44.3298969072165%, 80.98039215686275%, 0) 100%), radial-gradient(at 4.8396164466446345% 32.997255065109535%, hsla(68.10810810810808, 45.67901234567898%, 84.11764705882354%, 1) 0%, hsla(68.10810810810808, 45.67901234567898%, 84.11764705882354%, 0) 100%), radial-gradient(at 86.26232892319425% 8.258789933446353%, hsla(0, 0%, 96.86274509803921%, 1) 0%, hsla(0, 0%, 96.86274509803921%, 0) 100%), radial-gradient(at 0.9254780913354965% 28.238172743985523%, hsla(312.3529411764706, 28.81355932203392%, 76.86274509803921%, 1) 0%, hsla(312.3529411764706, 28.81355932203392%, 76.86274509803921%, 0) 100%)',
            },
          }}
          open={open}
        >
          <Box
            sx={{
              p: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 64,
            }}
          >
            {open ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '200px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography sx={{ fontWeight: 600 }}>
                    HankVanRose AI
                  </Typography>
                  <IconButton onClick={onToggle}>
                    <BiWindowOpen style={{ rotate: '270deg' }} />
                  </IconButton>
                </Box>

                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => chatStore.createChat()}
                  fullWidth
                  sx={{ mr: 1 }}
                >
                  Новый чат
                </Button>
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <Typography sx={{ fontWeight: 600, padding: '30px 0  30px 0' }}>
                  HVR
                </Typography>

                <Tooltip title="Открыть боковую панель" placement="right">
                  <IconButton onClick={onToggle} sx={{ width: 44, height: 44 }}>
                    <BiWindowOpen style={{ rotate: '90deg' }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Создать новый чат" placement="right">
                  <IconButton
                    onClick={() => chatStore.createChat()}
                    sx={{ width: 44, height: 44 }}
                  >
                    <RiChatNewLine />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Box>

          <List sx={{ overflowY: 'auto', height: 'calc(100vh - 120px)' }}>
            <AnimatePresence>
              {chatStore.chats.map((chat ) =>
                open ? (
                  <motion.div
                    key={chat.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50, height: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ListItem
                      sx={{
                        width: 270,
                      }}
                      key={chat.id}
                      secondaryAction={
                        editingChatId === chat.id ? (
                          <Box sx={{ display: 'flex' }}>
                            <IconButton
                              edge="start"
                              onClick={() => handleSaveEdit(chat.id)}
                            >
                              <Check style={{ width: 20, height: 20 }} />
                            </IconButton>
                            <IconButton edge="start" onClick={handleCancelEdit}>
                              <Close style={{ width: 20, height: 20 }} />
                            </IconButton>
                          </Box>
                        ) : (
                          <Box sx={{ display: 'flex' }}>
                            <IconButton
                              edge="end"
                              onClick={() =>
                                handleStartEdit(chat.id, chat.title)
                              }
                            >
                              <Edit style={{ width: 20, height: 20 }} />
                            </IconButton>
                            <IconButton
                              edge="end"
                              onClick={() => handleDeleteWithAnimation(chat.id)}
                              disabled={deletingChatId === chat.id}
                            >
                              <Delete style={{ width: 20, height: 20 }} />
                            </IconButton>
                          </Box>
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
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleSaveEdit(chat.id);
                              if (e.key === 'Escape') handleCancelEdit();
                            }}
                          />
                        ) : (
                          <ListItemText
                            primary={`${
                              chat.title.length > 16
                                ? `${chat.title.slice(0, 16)}...`
                                : chat.title
                            }`}
                            secondary={new Date(
                              chat.createdAt
                            ).toLocaleString()}
                          />
                        )}
                      </ListItemButton>
                    </ListItem>
                  </motion.div>
                ) : (
                  <Tooltip
                    key={chat.id}
                    title={`${
                      chat.title.length > 16
                        ? `${chat.title.slice(0, 16)}...`
                        : chat.title
                    }`}
                    placement="right"
                  >
                    <ListItem sx={{ justifyContent: 'center' }}>
                      <motion.div
                        key={chat.id}
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
                            alignContent: 'center',
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 'auto' }}>
                            <FaRocketchat style={{ width: 20 }} />
                          </ListItemIcon>
                        </ListItemButton>
                      </motion.div>
                    </ListItem>
                  </Tooltip>
                )
              )}
            </AnimatePresence>
          </List>
          {open ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
                borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
              }}
            >
              <Avatar
                sx={{
                  width: 40,
                  height: 40,

                  bgcolor: '#4a6cf7',
                  fontSize: '1rem',
                  fontWeight: 700,
                }}
              >
                US
              </Avatar>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 500,
                  color: 'text.primary',
                }}
              >
                Мой профиль
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
                borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
              }}
            >
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: '#4a6cf7',
                  fontSize: '1rem',
                  fontWeight: 600,
                }}
              >
                US
              </Avatar>
            </Box>
          )}
        </Drawer>
      </>
    );
  }
);
