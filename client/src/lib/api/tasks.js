import qs from 'qs';
import client from './client';

export const createTask = ({ title, description, tags, serverRepoAddr }) =>
  client.post('/api/tasks', { title, description, tags, serverRepoAddr });

export const readTask = (id) => client.get(`/api/tasks/${id}`);

export const listTasks = ({ page, username, tag }) => {
  const queryString = qs.stringify({
    page,
    username,
    tag,
  });
  return client.get(`/api/tasks?${queryString}`);
};

export const updateTask = ({ id, title, description, tags, serverRepoAddr }) =>
  client.patch(`/api/tasks/${id}`, {
    title,
    description,
    tags,
    serverRepoAddr,
  });

export const removeTask = (id) => client.delete(`/api/tasks/${id}`);
