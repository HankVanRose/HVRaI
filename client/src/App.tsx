import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, styled } from '@mui/material';

import { Route, Routes } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';

import UserStore from './stores/UserStore';

import ProtectedRoute from './components/ProtectedRoute';
import UserProfile from './pages/UserProfile';
import AuthInitializer from './components/AuthInitializer';
import { ChatLayout } from './components/Layout/ChatLayout';

const AppContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  height: '100vh',
  width: '100vw',
  overflow: 'hidden',
});

export const App = observer(() => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    UserStore.checkAuth();
  }, []);

  return (
    <AuthInitializer>
      <AppContainer>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/userprofile" element={<UserProfile />} />
            <Route
              path="/chat"
              element={
                <ChatLayout
                  sidebarOpen={sidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
              }
            />
          </Route>
        </Routes>
      </AppContainer>
    </AuthInitializer>
  );
});
