import { useState } from 'react';
import { Box, Typography, Button, Fade } from '@mui/material';
import Spinner from '../components/UI/Spinner/Spinner';
import Register from './Registration';
import LoginPage from './LoginPage';
import ParticlesBg from 'particles-bg';
import { Navigate } from 'react-router';
import UserStore from '../stores/UserStore';
import { observer } from 'mobx-react-lite';

const WelcomePage = observer(() => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  if (UserStore.user) {
    return <Navigate to="/chat" replace />;
  }

  const toggleForm = () => {
    setIsLoginForm((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90%',
        textAlign: 'center',
        gap: 2,
        p: 3,
      }}
    >
      <ParticlesBg color="#000000" type="cobweb" num={50} bg={true} />
      <Spinner />
      <Typography variant="h2" gutterBottom>
        HankVanRose AI Assistant
      </Typography>
      <Box sx={{ position: 'relative', minHeight: 300 }}>
        <Fade in={isLoginForm} unmountOnExit>
          <div>{isLoginForm && <LoginPage />}</div>
        </Fade>
        <Fade in={!isLoginForm} unmountOnExit>
          <div>{!isLoginForm && <Register />}</div>
        </Fade>

        <Button
          variant="text"
          onClick={toggleForm}
          sx={{ mt: 1, color: '#ff1d5e' }}
        >
          {isLoginForm ? 'Нет аккаунта? Создать' : 'Уже есть аккаунт? Войти'}
        </Button>
      </Box>
    </Box>
  );
});
export default WelcomePage;
