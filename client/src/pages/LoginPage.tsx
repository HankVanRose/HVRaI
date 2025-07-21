import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Button, TextField, Container, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import UserStore from '../stores/UserStore';
import { validateEmail, validatePassword } from '../utils/validation';

const LoginPage = observer(() => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateForm = (): boolean => {
    const newErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      await UserStore.login(formData);
      navigate('/chat');
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message.includes('Incorrect email or password')) {
          setFormError('Неверный email или пароль');
        } else if (error.message.includes('User not found')) {
          setFormError('Пользователь с таким email не найден');
        } else {
          setFormError('Произошла ошибка при входе. Попробуйте позже.');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 4, background: 'var(--fancy-gradient)' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Вход
        </Typography>
        {formError && (
          <Typography color="error" align="center" sx={{ mb: 2 }}>
            {formError}
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
            error={!!errors.email}
            helperText={errors.email}
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
            error={!!errors.password}
            helperText={errors.password}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, background: '#ff1d5e' }}
            disabled={isLoading}
          >
            {isLoading ? 'Загрузка...' : 'Войти'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
});

export default LoginPage;
