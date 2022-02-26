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
    return response;
  } catch (error) {
    console.error('Auth error: ', error);
  }
};

export const logout = async () => {
  try {
    await client({
      method: 'GET',
      url: `/auth/logout`,
    });
  } catch (error) {
    console.error('Logout error: ', error);
  }
};
