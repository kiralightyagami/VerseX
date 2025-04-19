import axios from 'axios';

const BACKEND_URL = "http://localhost:3000";

export interface User {
  id: string;
  username: string;
  type: 'admin' | 'user';
  token?: string;
  avatarId?: string;
}

export const signUp = async (username: string, password: string, type: 'admin' | 'user'): Promise<User> => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
      type
    });

    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Signup failed');
  } catch (error: any) {
    if (error.response?.status === 400) {
      throw new Error('Username already exists');
    }
    throw new Error('An error occurred during signup');
  }
};

export const signIn = async (username: string, password: string): Promise<User> => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username,
      password
    });

    if (response.status === 200) {
      return {
        ...response.data,
        token: response.data.token
      };
    }
    throw new Error('Sign in failed');
  } catch (error: any) {
    if (error.response?.status === 403) {
      throw new Error('Invalid credentials');
    }
    throw new Error('An error occurred during sign in');
  }
};

export const updateUserMetadata = async (token: string, avatarId: string) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/user/metadata`,
      { avatarId },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Failed to update user metadata');
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'An error occurred');
  }
};

export const createSpace = async (token: string, name: string, dimensions: string, mapId?: string) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/space`,
      { name, dimensions, mapId },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Failed to create space');
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'An error occurred');
  }
};