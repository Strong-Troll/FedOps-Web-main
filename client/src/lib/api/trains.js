import qs from 'qs';
import client from './client';


export const readTask = (id) => client.get(`/api/trains/${id}`);

export const listTasks = ({ page, username, tag }) => {
  const queryString = qs.stringify({
    page,
    username,
    tag,
  });
  return client.get(`/api/tasks?${queryString}`);
};
