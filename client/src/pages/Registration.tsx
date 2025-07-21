import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Button, TextField, Container, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import UserStore from '../stores/UserStore';

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log(UserStore?.user);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await UserStore.register(formData);
      navigate('/chat');
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error(error);
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
          Регистрация
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="userName"
            label="Имя пользователя"
            fullWidth
            margin="normal"
            value={formData.userName}
            onChange={handleChange}
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
            Зарегистрироваться
          </Button>
        </form>
      </Paper>
    </Container>
  );
});

export default Register;
