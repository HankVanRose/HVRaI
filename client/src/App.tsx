import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, createTheme, CssBaseline, styled, ThemeProvider } from '@mui/material';
import { ChatList } from './components/ChatList';
import { MessageList } from './components/MessageList';
import { MessageInput } from './components/MessageInput';
import { ChatContainer } from './components/ChatContainer';
import { ChatLayout } from './Layout/ChatLayout';
import { ChatSidebar } from './components/test/ChatSideBar';
import { MainChatArea } from './components/test/MainChatArea';

 
const AppContainer = styled(Box)({
  display: 'flex',
  height: '100vh',
});
export const App = observer(() => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
       <AppContainer>
        <ChatSidebar 
          open={sidebarOpen} 
          onToggle={() => setSidebarOpen(!sidebarOpen)} 
        />
        <MainChatArea 
          onMenuClick={() => setSidebarOpen(true)}
        />
      </AppContainer>
 </>
)});
