import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Button, TextField, Container, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import UserStore from '../stores/UserStore';
import { validateEmail, validatePassword, validateUsername } from '../utils/validation';

interface IFormData {
  userName: string;
  email: string;
  password: string;
}

const Register = observer(() => {
  const [formData, setFormData] = useState<IFormData>({
    userName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<IFormData>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Очищаем ошибку при изменении поля
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateForm = (): boolean => {
    const newErrors = {
      userName: validateUsername(formData.userName),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    if (!validateForm()) return;
    
    try {
      await UserStore.register(formData);
      navigate('/chat');
    } catch (error) {
      setFormError('Registration failed. Please try again.');
      console.error(error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 4, background: 'var(--fancy-gradient)' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Регистрация
        </Typography>
        {formError && (
          <Typography color="error" align="center" sx={{ mb: 2 }}>
            {formError}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            name="userName"
            label="Имя пользователя"
            fullWidth
            margin="normal"
            value={formData.userName}
            onChange={handleChange}
            error={!!errors.userName}
            helperText={errors.userName}
            required
          />
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
          >
            Зарегистрироваться
          </Button>
        </form>
      </Paper>
    </Container>
  );
});
export default Register;
