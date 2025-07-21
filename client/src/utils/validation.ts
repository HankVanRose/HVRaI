export const validateEmail = (email: string): string | null => {
  if (!email) return 'Email обязателен для заполнения';

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Введите корректный email (например, user@example.com)';
  }

  return null;
};

 
export const validatePassword = (password: string): string | null => {
  if (!password) return 'Пароль обязателен для заполнения';

  if (password.length < 5) {
    return 'Пароль должен содержать минимум 5 символов';
  }

  if (!/[A-Z]/.test(password)) {
    return 'Пароль должен содержать хотя бы одну заглавную букву';
  }

  if (!/[0-9]/.test(password)) {
    return 'Пароль должен содержать хотя бы одну цифру';
  }

  return null;
};

 
export const validateUsername = (username: string): string | null => {
  if (!username) return 'Имя пользователя обязательно для заполнения';

  if (username.length < 3) {
    return 'Имя пользователя должно содержать минимум 3 символа';
  }

  return null;
};
