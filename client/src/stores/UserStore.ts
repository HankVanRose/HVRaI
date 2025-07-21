import { makeAutoObservable, action, runInAction } from 'mobx'; // Добавляем action
import type { IUser } from '../types/types';
import axiosInstance, { setAccessToken } from '../axiosInstance';
import axios from 'axios';

class UserStore {
  user: IUser | null = null;
  isLoading = true;
  isAuthChecked = false;
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.initializeAuth();
  }
  initializeAuth = async () => {
    await this.checkAuth();
    runInAction(() => {
      this.isAuthChecked = true;
    });
  };

  register = action(
    async (userData: { userName: string; email: string; password: string }) => {
      try {
        const response = await axiosInstance.post(
          `${import.meta.env.VITE_API_URL}/auth/signup`,
          userData
        );
        this.setUser(response.data.user);
        setAccessToken(response.data.accessToken);
        return response.data.user;
      } catch (error) {
        console.error('Registration error:', error);
        throw error;
      }
    }
  );

  login = action(async (userData: { email: string; password: string }) => {
    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/auth/signin`,
        userData
      );
      this.setUser(response.data.user);
      setAccessToken(response.data.accessToken);
      return response.data.user;
    } catch (error) {
      let errorMessage = 'Login failed';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      }
      throw new Error(errorMessage);
    }
  });

  checkAuth = async () => {
    try {
      runInAction(() => {
        this.isLoading = true;
      });

      const response = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/token/refresh`
      );

      runInAction(() => {
        setAccessToken(response.data.accessToken);
        this.user = response.data.user;
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      runInAction(() => {
        this.user = null;
        setAccessToken('');
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };
  updateUserProfile = action(async (updatedUser: Partial<IUser>) => {
    if (!this.user) return;

    try {
      const response = await axiosInstance.put(
        `${import.meta.env.VITE_API_URL}/user/profile`,
        updatedUser
      );
      this.setUser(response.data.user);
      return response.data.user;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  });

  logout = action(async () => {
    try {
      await axiosInstance.get(`${import.meta.env.VITE_API_URL}/auth/logout`);
      this.setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  });

  private setUser = action((user: IUser | null) => {
    this.user = user;
  });

  private setLoading = action((isLoading: boolean) => {
    this.isLoading = isLoading;
  });
}

export default new UserStore();
