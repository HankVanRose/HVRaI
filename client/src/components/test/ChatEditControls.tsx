import { Box, IconButton } from '@mui/material';
import { Check, Close, Edit, Delete } from '@mui/icons-material';
import { chatStore } from '../../stores/ChatStore';
import { useState } from 'react';

interface ChatEditControlsProps {
  chatId: string;
  editingChatId: string | null;
  onStartEdit: () => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
}

export const ChatEditControls = ({
  chatId,
  editingChatId,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
}: ChatEditControlsProps) => {
  const [deletingChatId, setDeletingChatId] = useState<string | null>(null);

  const handleDeleteWithAnimation = async () => {
    setDeletingChatId(chatId);
    await new Promise((resolve) => setTimeout(resolve, 100));
    await chatStore.deleteChat(chatId);
    setDeletingChatId(null);
  };

  if (editingChatId === chatId) {
    return (
      <Box sx={{ display: 'flex',   }}>
        <IconButton
          size="small"
          edge="end"
          onClick={onSaveEdit}
          
        >
          <Check style={{ width: 20, height: 20 }} />
        </IconButton>
        <IconButton edge="end" onClick={onCancelEdit}>
          <Close style={{ width: 20, height: 20 }} />
        </IconButton>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', }}>
      <IconButton edge="end" onClick={onStartEdit}>
        <Edit style={{ width: 20, height: 20 }} />
      </IconButton>
      <IconButton
        edge="end"
        onClick={handleDeleteWithAnimation}
        disabled={deletingChatId === chatId}
      >
        <Delete style={{ width: 20, height: 20 }} />
      </IconButton>
    </Box>
  );
};
