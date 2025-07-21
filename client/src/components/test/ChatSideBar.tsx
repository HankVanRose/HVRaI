import { Drawer, Box } from '@mui/material';
import { observer } from 'mobx-react-lite';
 
import { ChatList } from './ChatList';
import { UserProfileMenu } from './UserProfileMenu';
import { SidebarHeader } from './SideBarHeader';

export const ChatSidebar = observer(
  ({ open, onToggle }: { open: boolean; onToggle: () => void }) => {
    return (
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: open ? 271 : 68,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          transition: 'width 0.5s ease',
          '& .MuiDrawer-paper': {
            width: open ? 271 : 68,
            overflowX: 'hidden',
            transition: 'width 0.5s ease',
            boxSizing: 'border-box',
            borderRight: '0.5 px solid gray',
            background: 'var(--fancy-gradient)',
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
          <SidebarHeader open={open} onToggle={onToggle} />
        </Box>

        <ChatList open={open} />

        <UserProfileMenu open={open} />
      </Drawer>
    );
  }
);