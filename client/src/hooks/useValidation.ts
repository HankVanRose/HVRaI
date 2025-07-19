import { useState } from 'react';
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from '../utils/authValidCheck';

export const useValidation = () => {
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const validateField = (name: string, value: string) => {
    let error = null;

    switch (name) {
      case 'username':
        error = validateUsername(value);
        break;
      case 'password':
        error = validatePassword(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };
  return { errors, validateField };
};
