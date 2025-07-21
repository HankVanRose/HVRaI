import { Box, Divider, List, ListSubheader } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { chatStore } from '../../stores/ChatStore';
import { ChatListItem } from './ChatListItem';
import type { Chat } from '../../types/types';
import {
  format,
  isToday,
  isYesterday,
  isThisWeek,
  isThisYear,
  parseISO,
} from 'date-fns';

export const ChatList = observer(({ open }: { open: boolean }) => {
  const groupedChats = chatStore.chats.reduce((acc, chat) => {
    const date = parseISO(chat.createdAt);
    let groupKey;

    if (isToday(date)) {
      groupKey = 'Сегодня';
    } else if (isYesterday(date)) {
      groupKey = 'Вчера';
    } else if (isThisWeek(date)) {
      groupKey = 'На этой неделе';
    } else if (isThisYear(date)) {
      groupKey = format(date, 'MMMM');  
    } else {
      groupKey = format(date, 'MMMM yyyy');  
    }

    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(chat);
    return acc;
  }, {} as Record<string, Chat[]>);

  // Сортируем группы по дате (новые сверху)
  const sortedGroups = Object.entries(groupedChats).sort(
    ([_, chatsA], [__, chatsB]) => {
      return (
        parseISO(chatsB[0].createdAt).getTime() -
        parseISO(chatsA[0].createdAt).getTime()
      );
    }
  );

  return (
    <List sx={{ overflowY: 'auto', height: 'calc(100vh - 120px)' }}>
      {sortedGroups.map(([groupName, chats]) => (
        <Box key={groupName}>
          <ListSubheader
            sx={{
              cursor: 'default',
              display: 'flex',
              justifyContent: 'center',
              bgcolor: 'var(--fancy-gradient)',
              textTransform: 'capitalize',
              fontWeight: 'bold',
              fontSize: '0.75rem',
              lineHeight: '26px',
              color: 'text.secondary',
            }}
          >
            {groupName}
          </ListSubheader>
          {chats.map((chat) => (
            <ChatListItem key={chat.id} chat={chat} open={open} />
          ))}
        </Box>
      ))}
    </List>
  );
});
