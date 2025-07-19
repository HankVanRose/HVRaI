import { Box, Drawer, useMediaQuery, useTheme } from '@mui/material';

import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { ChatHistory } from '../components/ChatHistory';
import { MainChatArea } from '../components/MainChatArea';

const drawerWidth = 320;

const LayoutContainer = styled(Box)({
  display: 'flex',
  height: '100vh',
});

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

export const ChatLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <LayoutContainer>
      {/* Боковая панель для десктопа */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: 'none',
          },
          display: { xs: 'none', md: 'block' },
        }}
        variant="permanent"
        anchor="left"
      >
        <ChatHistory />
      </Drawer>

      {/* Мобильное меню */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        <ChatHistory />
      </Drawer>

      <MainContent>
        {/* Кнопка меню для мобильных */}
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              ml: 1,
              mt: 1,
              position: 'absolute',
              zIndex: theme.zIndex.drawer + 1,
            }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <MainChatArea />
      </MainContent>
    </LayoutContainer>
  );
};
