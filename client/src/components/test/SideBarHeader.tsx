import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { BiWindowOpen } from 'react-icons/bi';
import { Add } from '@mui/icons-material';
import { chatStore } from '../../stores/ChatStore';
import { RiChatNewLine } from 'react-icons/ri';

interface SidebarHeaderProps {
  open: boolean;
  onToggle: () => void;
}

export const SidebarHeader = ({ open, onToggle }: SidebarHeaderProps) => {
  if (!open) {
    return (
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
    );
  }

  return (
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
        <Typography sx={{ fontWeight: 600 }}>HankVanRose AI</Typography>
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
  );
};
