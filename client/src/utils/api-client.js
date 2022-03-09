import axios from 'axios';
import { toast } from 'react-hot-toast';

export const client = axios.create({
  baseURL: '/api/v1',
});

export const auth = async (userData, responseType) => {
  // try {
  const response = await client({
    method: 'POST',
    url: `/auth/${responseType}`,
    data: userData,
  });
  console.log('Response'.response);
  return response;
  // } catch (error) {
  //   console.error('Auth error: ', error);
  // }
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

export const updateProject = async ({ projectId, ...project }) => {
  try {
    const { data } = await client({
      method: 'PATCH',
      url: `/projects/${projectId}`,
      data: { ...project },
    });
    return data;
  } catch (error) {
    console.error('Update project error: ', error);
  }
};

export const deleteProject = async (projectId) => {
  try {
    await client({
      method: 'DELETE',
      url: `/projects/${projectId}`,
    });
  } catch (error) {
    console.error('Delete project error: ', error);
  }
};

export const getAllBlogs = async () => {
  try {
    const { data } = await client({
      method: 'GET',
      url: `/blogs`,
    });

    return data?.blogs;
  } catch (error) {
    console.error('Get all blogs error: ', error);
  }
};

export const addBlog = async (blogData) => {
  try {
    await client({
      method: 'POST',
      url: `/blogs`,
      data: blogData,
    });
  } catch (error) {
    console.error('Add blog error: ', error);
  }
};

export const updateBlog = async ({ blogId, ...blog }) => {
  try {
    const { data } = await client({
      method: 'PATCH',
      url: `/blogs/${blogId}`,
      data: { ...blog },
    });
    return data;
  } catch (error) {
    console.error('Update blog error: ', error);
  }
};

export const deleteBlog = async (blogId) => {
  try {
    await client({
      method: 'DELETE',
      url: `/blogs/${blogId}`,
    });
  } catch (error) {
    console.error('Delete blog error: ', error);
  }
};

export const updateProfile = async (values) => {
  try {
    await client({
      method: 'PATCH',
      url: `/user`,
      data: values,
    });
  } catch (error) {
    console.error('updateProfile error: ', error);
  }
};

export const updateSocials = async (values) => {
  try {
    await client({
      method: 'POST',
      url: `/user/socials`,
      data: values,
    });
  } catch (error) {
    console.error('updateSocials error: ', error);
  }
};

export const changePassword = async (values) => {
  try {
    await client({
      method: 'PATCH',
      url: `/user/change-password`,
      data: values,
    });
  } catch (error) {
    console.error('changePassword error: ', error);
  }
};
