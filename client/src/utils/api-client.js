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

export const getAllProjects = async () => {
  try {
    const { data } = await client({
      method: 'GET',
      url: `/projects`,
    });

    return data?.projects;
  } catch (error) {
    console.error('Get all projects error: ', error);
  }
};

export const addProject = async (projectData) => {
  try {
    await client({
      method: 'POST',
      url: `/projects`,
      data: projectData,
    });
  } catch (error) {
    console.error('Add project error: ', error);
  }
};
