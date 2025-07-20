import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import UserStore from '../stores/UserStore';
import { CircularProgress, Box } from '@mui/material';

const AuthInitializer = observer(({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    UserStore.checkAuth();
  }, []);

  if (!UserStore.isAuthChecked) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return <>{children}</>;
});

export default AuthInitializer;