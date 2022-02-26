import axios from 'axios';

export const client = axios.create({
  baseURL: '/api/v1',
});

export const auth = async (userData, responseType) => {
  try {
    const response = await client({
      method: 'POST',
      url: `/auth/${responseType}`,
      data: userData,
    });
  } catch (error) {
    console.error('Sign in error: ', error);
  }
};
