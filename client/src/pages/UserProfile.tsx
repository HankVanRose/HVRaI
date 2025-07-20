import { observer } from 'mobx-react-lite';
import { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import ava from '../assets/ava.jpg';

import { useNavigate } from 'react-router-dom';
import UserStore from '../stores/UserStore';

const UserProfile = observer(() => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    newPassword: '',
    confirmPassword: '',
  });

  const user = UserStore.user;

  useEffect(() => {
    if (UserStore.user) {
      setFormData({
        userName: UserStore.user.userName || '',
        email: UserStore.user.email || '',
        password: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
  }, [user]);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Профиль пользователя
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
          }}
        >
          {/* Блок с аватаром */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box sx={{ position: 'relative', mb: 2 }}>
              <Avatar
                src={ava}
                sx={{
                  width: 150,
                  height: 150,
                  fontSize: 60,
                  bgcolor: 'primary.main',
                }}
              />
            </Box>

            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {user?.userName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>

          <Box component="form" sx={{ flex: 1 }}>
            <TextField
              disabled
              label="Имя пользователя"
              name="userName"
              value={formData.userName}
              fullWidth
              margin="normal"
              required
            />

            <TextField
              disabled
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              fullWidth
              margin="normal"
              required
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button variant="contained" onClick={() => navigate(-1)}>
            Назад
          </Button>
        </Box>
      </Paper>
    </Container>
  );
});

export default UserProfile;
