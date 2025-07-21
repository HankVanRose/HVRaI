import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Button, TextField, Container, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import UserStore from '../stores/UserStore';

const LoginPage = observer(() => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await UserStore.login({
        email: formData.email,
        password: formData.password,
      });
      navigate('/chat');
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message.includes('Incorrect email or password')) {
          setError('Неверный email или пароль');
        } else if (error.message.includes('User not found')) {
          setError('Пользователь с таким email не найден');
        } else if (error.message.includes('Invalid email or password format')) {
          setError('Некорректный формат email или пароля');
        } else {
          setError('Произошла ошибка при входе. Попробуйте позже.');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mt: 4,
          background: 'var(--fancy-gradient)',
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Вход
        </Typography>
        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            name="email"
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            name="password"
            label="Пароль"
            type="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, background: '#ff1d5e' }}
          >
            Войти
          </Button>
        </form>
      </Paper>
    </Container>
  );
});

export default LoginPage;
